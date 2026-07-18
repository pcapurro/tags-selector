async function main()
{
    const   engine = new Comunica.QueryEngine();

    const   query = `
        PREFIX owl: <http://www.w3.org/2002/07/owl#>

        SELECT ?classe
        WHERE {
            ?classe a owl:Class .
        }
        `;

    const   result = await engine.queryBindings(
        query,
        { sources: ["https://pcapurro.github.io/tags-selector/resources/ontology/structure-tags.rdf"] }
    );

    result.on("data", (binding) => {
        console.log(binding.get("classe").value);
    });

    result.on("end", () => {
        console.log("Fin");
    });

    result.on("error", (error) => {
        console.error(error);
    });
}

main();
