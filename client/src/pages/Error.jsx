import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
const Error = () => {
  const navigate = useNavigate();
  return (
    <main className="grid min-h-full place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="font-semibold text-blue-500 text-5xl">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page introuvable
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Désole, la page que vous recherchez n'existe pas.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/"
            className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Retour a l'acceuil
          </a>
          <a href="/contact" className="text-sm font-semibold text-gray-900">
            Contacter le support <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  );
};

export default Error;
