import { z } from "astro:schema";
import { Resend } from "resend";
import { RESEND_API_KEY } from "astro:env/server";
import { defineAction } from "astro:actions";

const resend = new Resend(RESEND_API_KEY);

export const server = {
  sendEmail: defineAction({
    accept: "json",
    input: z.object({
      name: z.string(),
      email: z.string(),
      message: z.string(),
      company: z.string(),
    }),
    handler: async ({ name, email, message, company }) => {
      const { error } = await resend.emails.send({
        from: "Majic Website <info@majicwebdesign.com>",
        to: ["matthewajustice@gmail.com"],
        subject: "POTENTIAL MAJIC CLIENT",
        html: `<p>New message from: ${name}<br />
                  Contact email: ${email} <br />
                  Company: ${company} <br />
                  Message: <br /> <br /> 
                  ${message}     
        <p>`,
      });

      if (error) {
        return error;
      }
    },
  }),
};
