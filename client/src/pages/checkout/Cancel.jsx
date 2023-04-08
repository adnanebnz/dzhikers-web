import { useNavigate } from "react-router-dom";
const Cancel = () => {
  const navigate = useNavigate();
  return (
    <div class="bg-gray-100 h-screen flex items-center justify-center">
      <div class="bg-white p-6  md:mx-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-circle-x"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#ff2825"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="w-20 h-20 mx-auto my-6"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <circle cx="12" cy="12" r="9" />
          <path d="M10 10l4 4m0 -4l-4 4" />
        </svg>
        <div class="text-center">
          <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Commande non validée.
          </h3>
          <p class="text-gray-600 my-2">
            Vous venez de annuler votre commande.
          </p>
          <div class="py-10 text-center">
            <button
              onClick={() => navigate("/")}
              class="px-12 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3"
            >
              ALLER A L'ACCUEIL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cancel;
