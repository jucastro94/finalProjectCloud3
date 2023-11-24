import { component$ } from "@builder.io/qwik";

interface Comment {
    createdBy: { name: string; };
    createdAt: Date;
    message: string;
    commentedAt: string;
  }

export default component$<{comment: Comment}>((props) => {
    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <p style={{ fontWeight: 'bold', margin: '0' }}>
                {props.comment.createdBy.name} - {props.comment.createdAt.toString()}
            </p>
            <p style={{ margin: '0' }}>
                {props.comment.message}
            </p>
        </div>            
    );
});
