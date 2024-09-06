import React from "react";
import { Link } from "react-router-dom";
import FeatureCard from "../components/FeatureCard";

const Landing = () => {
  return (
    <>
      <section className="w-full flex justify-center items-center h-[50vh] bg-gray-200">
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Your Shared Expenses</h1>
          <p className="mt-4 text-gray-700">
            Easily track, split, and settle your group <br />
            expenses with our intuitive expense management app.
          </p>

          <div className="mt-8 space-y-4 sm:flex sm:space-y-0 sm:space-x-4 sm:justify-center">
            <Link
              to="/signup"
              className="no-underline inline-block px-6 py-3 text-white bg-gray-900 rounded-md hover:bg-gray-800"
            >
              Get Started
            </Link>
            <Link
              to="/signup"
              className="no-underline inline-block px-6 py-3 text-gray-900 border border-gray-900 rounded-md hover:bg-gray-100"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
      <section className="w-full flex justify-center items-center  bg-gray-900">
        <div className="w-full  flex-col flex justify-center items-center my-28">
          <h1 className="text-3xl font-bold text-white">Features</h1>
          <p className="mt-4 text-white">Our expense tracking app offers a range of features to make managing shared expenses a breeze.</p>

          <div className="mt-8 w-11/12 flex flex-col gap-4 ">
            <Link
              to="/proyects"
              className="no-underline text-gray-900"
            >
            <FeatureCard
              icon={'bi bi-folder'}
              title={'Project Management'}
              description={'Create and manage projects with name, description, and member assignment.'}
              />
              </Link>
            <FeatureCard
              icon={'bi bi-calculator-fill'}
              title={'Contribution Tracking'}
              description={'Determine how much each member should pay or receive based on the expense distribution.'}
            />
            <FeatureCard
              icon={'bi bi-bar-chart-fill'}
              title={'Reporting and History'}
              description={'View detailed reports and transaction history for your projects and expenses.'}
            />
          </div>
        </div>
      </section>
    </>
  )
};

export default Landing;
