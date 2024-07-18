import { LoaderFunctionArgs } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { getUserById } from "../api.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.userId) {
    throw new Response("Id Not Found", { status: 404 });
  }
  const user = await getUserById(params.userId);
  if (!user) {
    throw new Response("User Not Found", { status: 404 });
  }
  return { user };
};

export default function User() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div className="w-full p-4">
      <div className="flex gap-4 items-center my-8 text-3xl text-blue-500 justify-center">
        <NavLink
          to={`/users/${user.id}/info`}
          className={({ isActive }) =>
            isActive ? "underline underline-offset-4" : ""
          }
        >
          Info
        </NavLink>
        <NavLink
          to={`/users/${user.id}/edit`}
          className={({ isActive }) =>
            isActive ? "underline underline-offset-4" : ""
          }
        >
          Edit
        </NavLink>
        <NavLink
          to={`/users/${user.id}/posts`}
          className={({ isActive }) =>
            isActive ? "underline underline-offset-4" : ""
          }
        >
          Posts
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
}
