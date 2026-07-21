// URL du fichier .rdf de l'ontologie
const   rdfUrl = "https://Fondation-SCP.github.io/tags-selector/resources/ontology/structure-tags.rdf"

// Instanciation de Comunica pour faire des requêtes SPARQL au fichier .rdf
const   engine = new Comunica.QueryEngine();

// Renvoie tous les tags racine
async function getRoots()
{
    const   query = `
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

        SELECT ?classe
        WHERE {
            ?classe a owl:Class .

            FILTER NOT EXISTS {
                ?classe rdfs:subClassOf ?parent .
            }
        }
        `;

    const   result = await engine.queryBindings(
        query,
        { sources: [rdfUrl] }
    );

    return await result.toArray();
}

// Renvoie tous les tags
async function getAll()
{
    const   query = `
        PREFIX owl: <http://www.w3.org/2002/07/owl#>

        SELECT ?classe
        WHERE {
            ?classe a owl:Class .
        }
        `;

    const   result = await engine.queryBindings(
        query,
        { sources: [rdfUrl] }
    );

    return await result.toArray();
}

// Affiche une liste de tags passée en paramètre
function printList(tags)
{
    for (const element of tags)
    {
        const   uri = element.get("classe").value;
        const   name = uri.split("#").pop();

        console.log("> '" + name + "'");
    }

    console.log("Total: " + tags.length);
}

async function main()
{
    printList(await getRoots());
}

main();
