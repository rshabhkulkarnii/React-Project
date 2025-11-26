import ReactMarkdown from "react-markdown";




export default function Recipe(props) {
    return(
        <section>
            <h2>Suggested Recipe :</h2>
            <ReactMarkdown>
                {props.recipe}
            </ReactMarkdown>
        </section>
    )   
}
