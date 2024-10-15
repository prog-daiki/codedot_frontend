interface CoursesLayoutProps {
  children: React.ReactNode;
}

const CoursesLayout = async ({ children }: CoursesLayoutProps) => {
  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto px-6 py-8">{children}</div>
    </div>
  );
};

export default CoursesLayout;
