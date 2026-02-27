import RolesClient from "./RolesClient";

export const metadata = {
  title: "Careers at CIA Labs",
  description:
    "Explore open roles at CIA Labs across tech, media, and operations.",
};

export default function Home() {
  // FE loads instantly, client handles the data fetch
  return <RolesClient />;
}