import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Commment from "~/components/comment/comment";
import connectDB from "~/scripts/db";

interface Comment {
  createdBy: { name: string; };
  createdAt: Date;
  message: string;
  commentedAt: string;
}

export default component$(() => {

  const comments = useSignal<Comment[]>();

  useTask$(async () => {
    const res = await connectDB();
    if (res.statusCode === 200) {
      const values = res.body as Comment[];
      comments.value = values;
    }
  });

  return (
    <>
      <h1>Hi 👋</h1>
      <p>
        This is a list of comments
        <br />
        Happy coding.
      </p>
      <div>
        {comments.value?.map(comment => {
          return (
            <Commment 
              comment={comment} 
              key={crypto.randomUUID()} 
            />
          );
        })}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
