type layoutProps = {
  title: string;
  children: React.ReactNode;
};
export const AuthLayout = (props: layoutProps) => {
  return (
    <div className="bg-white w-full min-h-screen grid place-content-center gap-4 ">
      <p className="text-center text-lg font-semibold md:text-xl">
        {props.title}
      </p>
      {props.children}
    </div>
  );
};
