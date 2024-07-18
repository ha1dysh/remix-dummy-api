import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useNavigation } from "@remix-run/react";
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

export default function UserInfo() {
  const { user } = useLoaderData<typeof loader>();
  const { state } = useNavigation();
  console.log(state);

  return (
    <div className="flex flex-col gap-4 items-center">
      {state === "loading" ? (
        <div className="spinner size-20"></div>
      ) : (
        <div className="flex gap-4 items-center">
          <img src={user.image} alt="user" className="size-32" />
          <div>
            <div className="text-2xl">
              {user.firstName} {user.lastName},{" "}
              <span className="text-gray-600">age {user.age}</span>
            </div>
            <div>{user.address?.country}</div>
            <div>
              {user.address?.city}, {user.address?.address}
            </div>
            <div>Email: {user.email}</div>
            <div>Favorite:{user.favorite ? " ⭐" : " ❌"}</div>
          </div>
        </div>
      )}
    </div>
  );
}
