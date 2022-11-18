import { Link } from "react-router-dom";
import { CheckCircle } from "react-feather";
function AuthPageLayout() {
  return (
    <div className="w-2/3">
      <div className="pr-16">
        <Link to="/signin" className="inline-block">
          <img
            src="images/logo.png"
            alt="Gorilla Cards"
            className="h-20 mb-16"
          />
        </Link>
        <div className="flex mb-8">
          <div className="pr-4 pt-1">
            <CheckCircle className="flex-none text-blue-500 h-6 w-6" />
          </div>
          <div>
            <h4 className="font-semibold text-xl text-gray-700 mb-2">
              Lorem, ipsum dolor sit
            </h4>
            <p className="text-gray-400 text-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe,
              ipsum?
            </p>
          </div>
        </div>
        <div className="flex mb-8">
          <div className="pr-4 pt-1">
            <CheckCircle className="flex-none text-blue-500 h-6 w-6" />
          </div>
          <div>
            <h4 className="font-semibold text-xl text-gray-700 mb-2">
              Consectetur adipisicing elit
            </h4>
            <p className="text-gray-400 text-md">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus, enim eaque.
            </p>
          </div>
        </div>
        <div className="flex mb-8">
          <div className="pr-4 pt-1">
            <CheckCircle className="flex-none text-blue-500 h-6 w-6" />
          </div>
          <div>
            <h4 className="font-semibold text-xl text-gray-700 mb-2">
              Amet consectetur adipisicing
            </h4>
            <p className="text-gray-400 text-md">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
        <div className="mt-36">
          <ul className="flex flex-wrap text-sm gap-x-5">
            <li>
              <Link to="/" className="text-gray-500 hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link to="/" className="text-gray-500 hover:underline">
                Privacy
              </Link>
            </li>
            <li>
              <Link to="/" className="text-gray-500 hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AuthPageLayout;
