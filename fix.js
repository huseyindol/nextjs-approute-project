const fs = require('node:fs')
const path = require('node:path')

const filePath = path.join(
  process.cwd(),
  'scripts',
  'generate-blog-contents.js',
)
let content = fs.readFileSync(filePath, 'utf8')

// We will literally just replace the single quotes in the YAML with double quotes.
// In scripts/generate-blog-contents.js, the generation looks like:
// "title: '" + article.title + "'\n" +
// We will change it to:
// 'title: "' + article.title.replace(/"/g, \'\\\\"\') + '"\n' +

content = content.replace(
  /"title: '" \+ article\.title \+ "'\\n" \+/g,
  "'title: \"' + article.title.replace(/\"/g, \\'\\\\\\'\\') + '\"\\\\n' +",
)
content = content.replace(
  /"description: '" \+ article\.content\.substring\(0, 100\) \+ "\.\.\.'\\n" \+/g,
  "'description: \"' + article.content.substring(0, 100).replace(/\"/g, \\'\\\\\\'\\') + '...\\\\\"\\\\n' +",
)

// Wait this regex is annoying. Let's just find the exact block and replace it using substring.
const targetStart = content.indexOf('articlesData.forEach(article => {')
const targetEnd = content.indexOf(
  'const filePath = path.join(blogDir, article.slug + ".mdx")',
)

if (targetStart > -1 && targetEnd > -1) {
  const replacement = `articlesData.forEach(article => {
  const mdxString = [
    "---",
    \`title: "\${article.title.replace(/"/g, '\\\\"')}"\`,
    \`description: "\${article.content.substring(0, 100).replace(/"/g, '\\\\"') }..."\`,
    \`publishedAt: '\${article.publishedAt}'\`,
    \`category: '\${article.category}'\`,
    \`author: '\${article.author}'\`,
    \`coverImage: '\${article.coverImage}'\`,
    \`readingTime: '\${article.readingTime}'\`,
    "---",
    "",
    \`Bu makale \${article.category} kategorisinde **\${article.title}** hakkında deneyimlerimi aktarmaktadır.\\n\`,
    article.content + "\\n",
    "## Deneyimlerimiz ve Derinlemesine Detaylar\\n",
    "Makalenin geri kalanında detaylı implementasyonları, kullandığımız \\\`tsx\\\` veya \\\`json\\\` bloklarını bulabilirsiniz. Sistem mimarisi ve otonom testlerin sonuçları bu bloklarda tartışılmıştır. Özellikle Elly mimarisi, takım dinamikleri ve performans kazanımları üzerine oldukça derin tespitlerimiz yer almaktadır.\\n",
    "\\\`\\\`\\\`javascript\\n",
    "// Geliştirmelerde referans aldığımız bir kod bloğu\\n",
    "const handleOptimization = () => {\\n",
    "   console.log('Optimizasyon sağlandı...');\\n",
    "   return { status: 'success', metrics: 100 };\\n",
    "}\\n",
    "\\\`\\\`\\\`\\n\\n",
    "> Not: Makale içerik metinleri şablon olarak tarafımca hazırlanmış olup, daha sonra editoryal yapılandırmalarla detaylandırılabilir.\\n"
  ].join("\\n");

  `
  content =
    content.substring(0, targetStart) +
    replacement +
    content.substring(targetEnd)
  fs.writeFileSync(filePath, content)
  console.log('Fixed!')
} else {
  console.log('Could not find targets')
}
