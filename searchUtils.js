/**
 * @param {string} query
 * @param {Array} galleryImages
 * @param {Object} products
 * @returns {Array}
 */
function searchProducts(query, galleryImages, products) {
    query = query.trim().toLowerCase();
    if (!query) return [];
    const results = [];
    galleryImages.forEach(imgData => {
        const product = (products && products[imgData.code]) ? products[imgData.code] : {};
        const infoText = [
            product.name,
            product.intro,
            product.size,
            product.color,
            product.price
        ].filter(Boolean).join(' ').toLowerCase();
        const queryWords = query.split(/\s+/).filter(Boolean);
        const codeText = imgData.code.toLowerCase();
        const allText = codeText + ' ' + infoText;

        let score = 0;
        if (allText.includes(queryWords[0])) score += 100;
        queryWords.forEach(word => {
            if (allText.includes(word)) score += 1;
        });
        if (allText.includes(query)) score += 10;

        if (score > 0) {
            results.push({ ...imgData, _score: score });
        }
    });
    results.sort((a, b) => b._score - a._score);
    return results;
}

window.searchProducts = searchProducts;
