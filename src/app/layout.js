import "./globals.css";
import { headers } from "next/headers";

import { getServSession } from "./api/auth/[...nextauth]/route";
import SessionProvider from "../components/SessionProvider";
import AuthLayout from "../layouts/AuthLayout";
import Layout from "../layouts/Layout";
import Header from "../shared/ui/Header";
import BottomNav from "../shared/ui/BottomNav";
import Head from "next/head";
import { getFastHrCompany } from "../server/actions/profile/getFastHrCompany";
// import Script from 'next/script'

export const metadata = {
  title: "Practica",
  description: "На связи с лучшими",
};

export default async function RootLayout({ children }) {
  const session = await getServSession();

  const headersList = headers();
  const fullUrl = headersList.get("x-invoke-path") || "";

  console.log(fullUrl.includes("landing"), fullUrl, "testimland");

  // console.log(hrComp, 'wow')

  return (
    <html>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
        {/* <meta name='HandheldFriendly' content='true' />
				<meta name='yandex-verification' content='76f3eafd299bf6ab' /> */}
      </Head>
      {/* <Script type='text/javascript'>
				{`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(96032500, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true,
        trackHash:true
   });`}
			</Script> */}
      {/* <noscript>
				<div>
					<img
						src='https://mc.yandex.ru/watch/96032500'
						style='position:absolute; left:-9999px;'
						alt=''
					/>
				</div>
			</noscript> */}

      <body
        className={` ${
          fullUrl.includes("landing")
            ? "bg-[#f6f6f8] dark:bg-[#f6f6f8]"
            : "bg-[#f6f6f8] dark:bg-[#141414]"
        } hideScrollbarNav`}
      >
        <SessionProvider session={session}>
          <AuthLayout>
            <Header role={session?.user?.role} />
            <main>
              <Layout>{children}</Layout>
            </main>
            <BottomNav role={session?.user?.role} />
          </AuthLayout>
        </SessionProvider>
      </body>
    </html>
  );
}
