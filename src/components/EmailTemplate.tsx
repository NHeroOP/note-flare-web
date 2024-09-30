import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Tailwind,
  Link,
} from "@react-email/components";
import { render } from "@react-email/render"
import { Book } from "lucide-react";
import React from "react";

interface VerificationEmailProps {
  userId: string;
  verifyToken: string;
  url: string,
}


export default function EmailTemplate({
  userId, verifyToken, url
}: VerificationEmailProps) {
  return (
    <Tailwind>
      <Html>
        <Head />
        <Preview>Confirm your email address</Preview>
        <Body className="bg-[#ffffff] my-0 mx-auto font-sans">
          <Container className="my-0 mx-auto py-0 px-[20px]">
            <Section className="mt-[32px]">
              <Img
                src={`https://placehold.co/120x36.png`}
                width="120"
                height="36"
                alt="Slack"
              />
              <Book />
            </Section>
            <Heading className="text-[#1d1c1d] text-[36px] font-[700] my-[30px] mx-0 p-0 leading-[42px]">Confirm your email address</Heading>
            <Text className="text-[20px] leading-[28px] mb-[30px]">
              Thanks for Registering - Please use the following verification code
              to complete your registration.
            </Text>

            <Section className="py-[40px] px-[10px] rounded-[4px] bg-gray-100">
              <Text className="text-[30px] text-center align-middle">{verifyToken}</Text>
            </Section>
            
            <Section className="mb-[30px]">
              <Link href={`${url}?user=${userId}&verifyToken=${verifyToken}`}>
                <Text className="text-[20px]">
                  {`${url}?user=${userId}&verifyToken=${verifyToken}`}
                </Text>
              </Link>
            </Section>

            <Text className="text-black text-[14px] leading-[24px]">
              If you didn't request this email, there's nothing to worry about, you
              can safely ignore it.
            </Text>

            <Section>
              <Text className="text-[12px] text-[#b7b7b7] text-left mb-[50px] leading-[15px]">
                &copy;{new Date().getFullYear()} Notes Flare, All Rights Reserved<br />
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}

export async function EmailTemplatePlainText({ userId, verifyToken, url: verifyPageUrl }: VerificationEmailProps) {
  const text = await render(EmailTemplate({ userId, verifyToken, url: verifyPageUrl }), {
    plainText: true,
  });
  
  return text;
}


EmailTemplate.PreviewProps = {
  verifyToken: "000000",
} as VerificationEmailProps;
