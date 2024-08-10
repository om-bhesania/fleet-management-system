import React from "react";
import { useLocation, useParams } from "react-router-dom";

const formatBreadcrumb = (crumb: string) => {
  return crumb
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const TopBar: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Generate breadcrumbs from pathnames
  const breadcrumbs = pathnames.map((_, index, arr) => {
    const breadcrumb = arr.slice(0, index + 1).join("/");
    return {
      name: formatBreadcrumb(pathnames[index]),
      path: breadcrumb,
    };
  });

  return (
    <div className="p-4 bg-gray-100 border-b border-gray-300">
      <h1 className="text-xl font-semibold">
        {breadcrumbs.length > 0
          ? breadcrumbs[breadcrumbs.length - 1].name
          : "Home"}
      </h1>
      <nav className="mt-2">
        <ol className="flex space-x-2 text-sm text-gray-600">
          {breadcrumbs.map((crumb, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && <span className="mx-2">/</span>}
              <a href={`/${crumb.path}`} className="hover:underline">
                {crumb.name}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default TopBar;
