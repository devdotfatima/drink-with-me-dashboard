import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import { classNames } from "../../../../shared/lib/utils";
import { Link } from "react-router";

type StatsPropsT = {
  totals: {
    totalRoutes: number;
    totalLocations: number;
  };
};
export default function Stats({ totals }: StatsPropsT) {
  const stats = [
    {
      id: 1,
      name: "Total Users",
      stat: totals.totalRoutes,
      changeType: "increase", 
      icon: ArrowUpIcon,
      link:"routes"
    },
    {
      id: 2,
      name: "Total Subscriptions",
      stat: totals.totalLocations,
      link: "locations",
      changeType: "increase",
      icon: ArrowUpIcon,
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-lg font-semibold leading-6 ">Last 30 days</h3>

      <dl className="grid grid-cols-1 gap-5  sm:grid-cols-2">
        {stats.map((item) => (
          <div
            key={item.id}
            className="relative px-4 pt-5 pb-12 overflow-hidden rounded-lg shadow bg-gray-200/80 sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute p-3 rounded-md bg-primary-600">
                <item.icon aria-hidden="true" className="w-6 h-6 text-white" />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                {item.name}
              </p>
            </dt>
            <dd className="flex items-baseline pb-6 ml-16 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                {item.stat}
              </p>
              <p
                className={classNames(
                  item.changeType === "increase"
                    ? "text-green-600"
                    : "text-red-600",
                  "ml-2 flex items-baseline text-sm font-semibold"
                )}
              >
                {item.changeType === "increase" ? (
                  <ArrowUpIcon
                    aria-hidden="true"
                    className="self-center flex-shrink-0 w-5 h-5 text-green-500"
                  />
                ) : (
                  <ArrowDownIcon
                    aria-hidden="true"
                    className="self-center flex-shrink-0 w-5 h-5 text-red-500"
                  />
                )}

                <span className="sr-only">
                  {" "}
                  {item.changeType === "increase"
                    ? "Increased"
                    : "Decreased"}{" "}
                  by{" "}
                </span>
              </p>
              <div className="absolute inset-x-0 bottom-0 px-4 py-4 bg-primary-600 sm:px-6">
                <div className="text-sm">
                  <Link
                    to={item.link}
                    className="font-medium text-white hover:underline hover:font-bold"
                  >
                    View all<span className="sr-only"> {item.name} stats</span>
                  </Link>
                </div>
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
