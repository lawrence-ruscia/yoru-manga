import styles from './ShopPage.module.css';

export const ShopPage = () => {
  return (
    <main>
      {/* Page Header */}
      <section>
        <header>Shop Manga</header>
        <p>Browse our curated manga collection</p>
      </section>

      {/* Controls: filters / sorting */}
      <section>
        <div> {/* Filters will live here */}</div>
        <div> {/* Sort dropdown will live here */}</div>
      </section>

      {/* Product grid */}
      <section>
        <ul>{/* Manga cards */}</ul>
      </section>
    </main>
  );
};
