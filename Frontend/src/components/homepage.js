import CreateNew from "./createTodo";
import Bodymain from "./main";

const Home = () => {
  return (
    <>
      <main>
        <Bodymain />
      </main>
      <section>
        <CreateNew />
      </section>
    </>
  );
};

export default Home;
