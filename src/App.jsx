import { useState } from "react";

// Liste de produits fictive
const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
];

function ProductList({ products }) {
  const [filterText, setFilterText] = useState(""); // Déclaration de l'état pour le texte de filtrage
  const [inStockOnly, setInStockOnly] = useState(false); // Déclaration de l'état pour "en stock seulement"

  // Fonction pour gérer le changement du texte de filtrage
  const handleFilterTextChange = (e) => {
    setFilterText(e.target.value); // Met à jour l'état filterText avec la valeur de l'entrée utilisateur
  };

  // Fonction pour gérer le changement de l'état "en stock seulement"
  const handleInStockChange = (e) => {
    setInStockOnly(e.target.checked); // Met à jour l'état inStockOnly avec la valeur booléenne de la case à cocher
  };

  // Filtrage des produits en fonction du texte de recherche et de la disponibilité en stock
  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(filterText.toLowerCase()) && // Vérifie si le nom du produit inclut le texte de recherche (ignorant la casse)
      (!inStockOnly || product.stocked) // Vérifie si le produit est en stock si la case à cocher "en stock seulement" est cochée
    );
  });

  // Rendu du composant ProductList
  return (
    <div className="container mx-auto px-4">
      {/* Champ de recherche */}
      <input
        type="text"
        placeholder="Search..."
        className="border border-gray-400 rounded-md px-4 py-2 mb-4"
        value={filterText}
        onChange={handleFilterTextChange}
      />
      {/* Case à cocher "en stock seulement" */}
      <div className="mb-4">
        <input
          type="checkbox"
          className="mr-2"
          checked={inStockOnly}
          onChange={handleInStockChange}
        />
        <span>Only show products in stock</span>
      </div>
      {/* Liste des produits filtrés */}
      <ul>
        {filteredProducts.map((product, index) => (
          <li
            key={index}
            className={`border rounded-md px-4 py-2 mb-2 ${!product.stocked && 'bg-red-200'}`}
          >
            {/* Affichage des détails du produit */}
            <span className="font-bold">{product.name}</span> -{" "}
            <span>{product.category}</span> - <span>{product.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return <ProductList products={PRODUCTS} />;
}

export default App;
