export default function ThanksPage() {
  return (
    <div className="max-w-md flex h-[90vh] flex-col justify-center items-center mx-auto  text-center">
      <div>
        {" "}
        <i className="hn hn-check text-6xl text-green-400 animate-bounce "></i>
        <h1 className="text-xl font-bold mt-4">Application Submitted</h1>
        <p className="mt-2 px-8 opacity-40 mb-4">
          We’ve received your application. You’ll hear from us soon.
        </p>
        <a href="/" className=" underline opacity-60 text-xs">
          Go Back
        </a>
      </div>
    </div>
  );
}
