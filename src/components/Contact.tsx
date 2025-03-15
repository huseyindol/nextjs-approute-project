"use client";

import { useState, useRef } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { useScrollAnimation } from "@/utils/hooks";
import { personalData } from "@/data/mockData";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});
  const contactRef = useRef<HTMLDivElement>(null);
  useScrollAnimation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({});

    // Simüle edilmiş form gönderimi
    try {
      // Gerçek bir API çağrısı burada yapılacak
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus({
        success: true,
        message: "Mesajınız başarıyla gönderildi. En kısa sürede dönüş yapacağım.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setSubmitStatus({
        success: false,
        message: "Mesajınız gönderilirken bir hata oluştu. Lütfen tekrar deneyin.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section" ref={contactRef}>
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl @md:text-4xl font-bold mb-4 animate-on-scroll">
            İletişim
          </h2>
          <div className="w-20 h-1 bg-[var(--primary)] mx-auto animate-on-scroll"></div>
        </div>

        <div className="grid grid-cols-1 @md:grid-cols-2 gap-12">
          <div className="animate-on-scroll">
            <h3 className="text-2xl font-bold mb-6">Bana Ulaşın</h3>
            <p className="mb-8">
              Bir proje hakkında konuşmak, işbirliği yapmak veya sadece merhaba
              demek için benimle iletişime geçebilirsiniz.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-[var(--primary)] text-white p-3 rounded-full">
                  <FaEnvelope className="text-xl" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Email</h4>
                  <a
                    href={`mailto:${personalData.email}`}
                    className="text-[var(--primary)] hover:underline"
                  >
                    {personalData.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[var(--primary)] text-white p-3 rounded-full">
                  <FaPhone className="text-xl" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Telefon</h4>
                  <a
                    href={`tel:${personalData.phone}`}
                    className="text-[var(--primary)] hover:underline"
                  >
                    {personalData.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[var(--primary)] text-white p-3 rounded-full">
                  <FaMapMarkerAlt className="text-xl" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Konum</h4>
                  <p>{personalData.location}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-on-scroll">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  İsim
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-2"
                >
                  Konu
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Mesaj
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full"
              >
                {isSubmitting ? "Gönderiliyor..." : "Gönder"}
              </button>

              {submitStatus.message && (
                <div
                  className={`p-4 rounded-lg ${submitStatus.success
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                    }`}
                >
                  {submitStatus.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 