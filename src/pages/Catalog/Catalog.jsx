import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import CatalogHero from "../../components/Cataloghero/Cataloghero"
import CatalogImgs from "../../components/Catalogimgs/Catalogimgs"
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"

function Catalog() {
    const [searchParams] = useSearchParams();
    const categoryParam = searchParams.get("category");

    const [filters, setFilters] = useState({
        categories: categoryParam ? [categoryParam] : [],
        priceFrom: 0,
        priceTo: 10000,
        sort: "Исходная сортировка",
    });

    return (
        <>
            <Header variant="back" />
            <CatalogHero filters={filters} onFiltersChange={setFilters} />
            <CatalogImgs filters={filters} />
            <Footer hideOnMobile />
        </>
    )
}

export default Catalog
