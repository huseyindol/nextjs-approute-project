import * as React from 'react'
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Hr,
  Heading,
} from '@react-email/components'

interface ContactEmailTemplateProps {
  name: string
  email: string
  message: string
}

export default function ContactEmailTemplate({
  name,
  email,
  message,
}: ContactEmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Heading style={h1}>📧 Yeni İletişim Mesajı</Heading>
            <Hr style={hr} />

            <Text style={paragraph}>
              <strong>Gönderen:</strong> {name}
            </Text>

            <Text style={paragraph}>
              <strong>E-posta:</strong> {email}
            </Text>

            <Hr style={hr} />

            <Text style={paragraph}>
              <strong>Mesaj:</strong>
            </Text>

            <Text style={messageStyle}>{message}</Text>

            <Hr style={hr} />

            <Text style={footer}>
              Bu mesaj huseyindol.site contact formundan gönderilmiştir.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
}

const box = {
  padding: '0 48px',
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
}

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '30px 0',
}

const paragraph = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
}

const messageStyle = {
  ...paragraph,
  backgroundColor: '#f8f9fa',
  padding: '16px',
  borderRadius: '6px',
  borderLeft: '4px solid #0070f3',
  margin: '16px 0',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
}
