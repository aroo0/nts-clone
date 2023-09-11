import Link from "next/link";


interface pageProps {}

const page: React.FC<pageProps> = ({}) => {
  return (
    <div className="flex h-full w-full items-center justify-center ">
      <div className="grid w-full place-items-center gap-5 border-neutral-700 p-2 pb-12 sm:mt-[-100px] 	sm:border sm:p-8 sm:w-[350px]">
        <h1 className="text-2xl font-extrabold uppercase">MY NTS</h1>
          <p className="text-center">Check email to continue sign in process.</p>
          <Link href="/sign-in" className="p-3 border border-neutral-700 uppercase text-sm">Go back</Link>
          
      </div>
    </div>
  );
};

export default page;
