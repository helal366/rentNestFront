import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { ContactForm } from "../_components/contact/ContactForm";
import { Footer } from "../_components/footer/Footer";

export const metadata = {
  title: "Contact Us | RentNest",
  description:
    "Get in touch with the RentNest support and corporate relations team.",
};

export default function ContactPage() {
  return (
    <>
    <main className="min-h-screen bg-white text-black py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-bold tracking-widest text-[#3E4A36] uppercase bg-[#3E4A36]/10 px-3 py-1 rounded-full">
            Get In Touch
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-black">
            Connect With <span className="text-[#3E4A36]">RentNest</span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Have questions about property listings, rental requests, or landlord
            partnerships? Our team is standing by to help.
          </p>
        </div>

        {/* Main Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Information Column (Left Side) */}
          <div className="lg:col-span-1 space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-black tracking-tight">
                Contact Information
              </h2>
              <p className="text-sm text-muted-foreground">
                Reach out directly or fill out the support form.
              </p>
            </div>

            {/* Core Info Info Stack */}
            <div className="space-y-4">
              <Card className="border border-neutral-100 bg-neutral-50/50 transition-all hover:border-[#3E4A36]/30">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="p-3 bg-[#3E4A36] text-white rounded-lg">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">
                      Call Our Office
                    </p>
                    <p className="text-sm font-semibold text-black">
                      +880 1234-567890
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-neutral-100 bg-neutral-50/50 transition-all hover:border-[#3E4A36]/30">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="p-3 bg-[#3E4A36] text-white rounded-lg">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">
                      Email Support
                    </p>
                    <p className="text-sm font-semibold text-black">
                      support@rentnest.com
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-neutral-100 bg-neutral-50/50 transition-all hover:border-[#3E4A36]/30">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="p-3 bg-[#3E4A36] text-white rounded-lg">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">
                      Headquarters
                    </p>
                    <p className="text-sm font-semibold text-black">
                      Gulshan-2, Dhaka, Bangladesh
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-neutral-100 bg-neutral-50/50 transition-all hover:border-[#3E4A36]/30">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="p-3 bg-black text-white rounded-lg">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">
                      Operational Hours
                    </p>
                    <p className="text-sm font-semibold text-black">
                      Sat - Thu: 9:00 AM - 6:00 PM
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Form Column (Right Side) */}
          <div className="lg:col-span-2">
            <Card className="border border-neutral-200 shadow-sm bg-white">
              <CardContent className="p-6 sm:p-8">
                <div className="mb-6 space-y-1">
                  <h3 className="text-xl font-bold text-black">
                    Send a Message
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    We typical respond to all verified requests within 24
                    operational hours.
                  </p>
                </div>

                {/* Embedded Client-Side Action Handler Form */}
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
    <Footer/>
    </>
  );
}
