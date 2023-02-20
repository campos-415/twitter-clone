import React from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";

function Login({ providers }) {
  return (
    <div className="flex flex-col items-center space-y-20 pt-48">
      <Image
      alt="twitter-icon"
        src="https://rb.gy/ogau5a"
        width={150}
        height={150}
        priority="yes"
      />
      <div>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            {/* see gobla.css for the tailwind classNames */}
            <button className="relative inline-block text-lg group" onClick={() => signIn(provider.id, {callbackUrl: "/" })}>
              <span className="span1">
                <span className="span2"></span>
                <span className="span3"></span>
                <span className="relative">Sign in with {provider.name}</span>
              </span>
              <span
                className="span4"
                data-rounded="rounded-lg"></span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Login;
