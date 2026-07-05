import { useState, useMemo, useEffect } from 'react';
import { PRODUCTS, CATEGORIES, MATERIALS, OCCASIONS, PRICE_RANGES } from './data.js';

const fmt = (n) => n.toLocaleString('fr-FR') + ' F';
const Stars = ({ n }) => <span className="card-stars">{'\u2605'.repeat(n)}{'\u2606'.repeat(5 - n)}</span>;

export default function App() {
  const [cats, setCats] = useState([]);
  const [mats, setMats] = useState([]);
  const [occs, setOccs] = useState([]);
  const [prices, setPrices] = useState([]);
  const [sort, setSort] = useState('featured');

  const [cart, setCart] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [orderId, setOrderId] = useState('');
  const [toast, setToast] = useState('');
  const [activeNav, setActiveNav] = useState('accueil');

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const toggle = (val, list, setList) =>
    setList(list.includes(val) ? list.filter((x) => x !== val) : [...list, val]);

  const filtered = useMemo(() => {
    let out = PRODUCTS.filter((p) => {
      if (cats.length && !cats.includes(p.cat)) return false;
      if (mats.length && !mats.includes(p.material)) return false;
      if (occs.length && !p.occasions.some((o) => occs.includes(o))) return false;
      if (prices.length) {
        const ok = prices.some((pid) => {
          const r = PRICE_RANGES.find((x) => x.id === pid);
          return p.price >= r.min && p.price < r.max;
        });
        if (!ok) return false;
      }
      return true;
    });
    if (sort === 'price-asc') out = [...out].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') out = [...out].sort((a, b) => b.price - a.price);
    if (sort === 'rating') out = [...out].sort((a, b) => b.rating - a.rating);
    return out;
  }, [cats, mats, occs, prices, sort]);

  const countFor = (predicate) => PRODUCTS.filter(predicate).length;
  const clearAll = () => { setCats([]); setMats([]); setOccs([]); setPrices([]); };
  const anyFilter = cats.length || mats.length || occs.length || prices.length;

  const addToCart = (p) => {
    setCart((c) => {
      const found = c.find((i) => i.id === p.id);
      if (found) return c.map((i) => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...c, { id: p.id, qty: 1 }];
    });
    setToast(p.name + ' ajout\u00e9 au panier');
  };
  const setQty = (id, d) => setCart((c) =>
    c.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + d) } : i));
  const removeItem = (id) => setCart((c) => c.filter((i) => i.id !== id));

  const cartDetailed = cart.map((i) => ({ ...PRODUCTS.find((p) => p.id === i.id), qty: i.qty }));
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal = cartDetailed.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 50000 || subtotal === 0 ? 0 : 1500;
  const total = subtotal + shipping;

  const openCart = () => { setStep(0); setDrawerOpen(true); };

  const placeOrder = () => {
    setOrderId('TB-' + Math.floor(1000 + Math.random() * 9000));
    setStep(3);
    setCart([]);
  };

  return (
    <>
      <div className="promo-band">
        \u2726 <strong>Offre d'ouverture</strong> \u2014 livraison offerte d\u00e8s 50\u202f000\u202fF d'achat. Profitez-en aujourd'hui\u202f!
      </div>

      <header className="header">
        <div className="container header-inner">
          <a href="#accueil" className="logo" onClick={() => setActiveNav('accueil')}>
            <span className="logo-mark">T</span>
            <span className="logo-text">Tina<span>\u00b7</span>Bijoux</span>
          </a>
          <nav className="nav">
            {[['accueil','Accueil'],['boutique','Boutique'],['avis','Votre avis'],['contact','Contact']].map(([id,label]) => (
              <a key={id} href={'#' + id} className={activeNav === id ? 'active' : ''} onClick={() => setActiveNav(id)}>{label}</a>
            ))}
          </nav>
          <button className="cart-btn" onClick={openCart} aria-label="Ouvrir le panier">
            \ud83d\udecd\ufe0f Panier {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
        </div>
      </header>

      <section className="hero" id="accueil">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">La gr\u00e2ce de Dieu \u00b7 Cotonou</span>
            <h1>Des bijoux qui <em>subliment</em> votre style.</h1>
            <p>
              Montres, colliers et accessoires choisis avec soin par Tina. Qualit\u00e9 et
              raffinement, \u00e0 des prix accessibles \u2014 pour briller chaque jour.
            </p>
            <div className="hero-actions">
              <a href="#boutique" className="btn btn-gold" onClick={() => setActiveNav('boutique')}>D\u00e9couvrir la collection</a>
              <a href="#avis" className="btn btn-outline" onClick={() => setActiveNav('avis')}>Laisser un avis</a>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="ring-deco">
              <div className="big">\u2726</div>
              <div className="hero-stars">\u2605 \u2605 \u2605 \u2605 \u2605</div>
              <div className="cap">Tina \u00b7 Bijoux</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="boutique">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Explorez la collection</span>
            <h2>Trouvez la pi\u00e8ce qui vous ressemble</h2>
            <p>Affinez votre recherche par cat\u00e9gorie, mati\u00e8re, budget ou occasion. \u00c0 vous de composer.</p>
          </div>

          <div className="shop-layout">
            <aside className="facets" aria-label="Filtres de recherche">
              <h3>Filtrer</h3>

              <div className="facet-group">
                <span className="facet-label">Cat\u00e9gorie</span>
                {CATEGORIES.map((c) => (
                  <label key={c} className="facet-opt">
                    <input type="checkbox" checked={cats.includes(c)} onChange={() => toggle(c, cats, setCats)} />
                    {c}
                    <span className="count">{countFor((p) => p.cat === c)}</span>
                  </label>
                ))}
              </div>

              <div className="facet-group">
                <span className="facet-label">Mati\u00e8re</span>
                {MATERIALS.map((m) => (
                  <label key={m.id} className="facet-opt">
                    <input type="checkbox" checked={mats.includes(m.id)} onChange={() => toggle(m.id, mats, setMats)} />
                    <span className="swatch" style={{ background: m.color }} />
                    {m.label}
                    <span className="count">{countFor((p) => p.material === m.id)}</span>
                  </label>
                ))}
              </div>

              <div className="facet-group">
                <span className="facet-label">Budget</span>
                {PRICE_RANGES.map((r) => (
                  <label key={r.id} className="facet-opt">
                    <input type="checkbox" checked={prices.includes(r.id)} onChange={() => toggle(r.id, prices, setPrices)} />
                    {r.label}
                    <span className="count">{countFor((p) => p.price >= r.min && p.price < r.max)}</span>
                  </label>
                ))}
              </div>

              <div className="facet-group">
                <span className="facet-label">Occasion</span>
                {OCCASIONS.map((o) => (
                  <label key={o} className="facet-opt">
                    <input type="checkbox" checked={occs.includes(o)} onChange={() => toggle(o, occs, setOccs)} />
                    {o}
                    <span className="count">{countFor((p) => p.occasions.includes(o))}</span>
                  </label>
                ))}
              </div>

              {anyFilter ? <button className="facet-clear" onClick={clearAll}>Effacer les filtres</button> : null}
            </aside>

            <div>
              <div className="shop-bar">
                <span className="count-txt"><strong>{filtered.length}</strong> bijou{filtered.length > 1 ? 'x' : ''} trouv\u00e9{filtered.length > 1 ? 's' : ''}</span>
                <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Trier les r\u00e9sultats">
                  <option value="featured">Trier : nos coups de c\u0153ur</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix d\u00e9croissant</option>
                  <option value="rating">Mieux not\u00e9s</option>
                </select>
              </div>

              {anyFilter ? (
                <div className="active-chips">
                  {cats.map((c) => <span key={c} className="chip">{c}<button onClick={() => toggle(c, cats, setCats)} aria-label={'Retirer ' + c}>\u00d7</button></span>)}
                  {mats.map((m) => <span key={m} className="chip">{MATERIALS.find((x) => x.id === m).label}<button onClick={() => toggle(m, mats, setMats)} aria-label="Retirer">\u00d7</button></span>)}
                  {prices.map((p) => <span key={p} className="chip">{PRICE_RANGES.find((x) => x.id === p).label}<button onClick={() => toggle(p, prices, setPrices)} aria-label="Retirer">\u00d7</button></span>)}
                  {occs.map((o) => <span key={o} className="chip">{o}<button onClick={() => toggle(o, occs, setOccs)} aria-label={'Retirer ' + o}>\u00d7</button></span>)}
                </div>
              ) : null}

              <div className="grid">
                {filtered.length === 0 ? (
                  <div className="empty-state">
                    <div className="big">\ud83d\udd0d</div>
                    <p>Aucun bijou ne correspond \u00e0 cette combinaison.<br />Essayez d'\u00e9largir votre recherche en retirant un filtre.</p>
                  </div>
                ) : filtered.map((p) => (
                  <article key={p.id} className="card">
                    <div className="card-media" style={{ background: 'linear-gradient(150deg, #EFE7D6, #F7F3EA)' }}>
                      {p.tag && <span className="card-tag">{p.tag}</span>}
                      <span aria-hidden="true">{p.glyph}</span>
                    </div>
                    <div className="card-body">
                      <span className="card-cat">{p.cat}</span>
                      <h3 className="card-name">{p.name}</h3>
                      <Stars n={p.rating} />
                      <p className="card-desc">{p.desc}</p>
                      <div className="card-foot">
                        <span className="card-price">{fmt(p.price)}</span>
                        <button className="btn btn-primary" onClick={() => addToCart(p)}>Ajouter</button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Survey onToast={setToast} />

      <footer className="footer" id="contact">
        <div className="container">
          <div className="footer-grid">
            <div>
              <span className="logo-text">Tina<span>\u00b7</span>Bijoux</span>
              <p style={{ marginTop: 14 }}>Des bijoux, montres et accessoires \u00e9l\u00e9gants pour sublimer votre style. Qualit\u00e9 et raffinement \u00e0 des prix accessibles.</p>
            </div>
            <div>
              <h4>Nous trouver</h4>
              <p>March\u00e9 Dantokpa \u2014 Hangar D140</p>
              <p>Cotonou, B\u00e9nin</p>
              <p>+229 01 51 52 08 40</p>
              <p>+229 01 97 46 96 84</p>
            </div>
            <div>
              <h4>Suivez-nous</h4>
              <a href="#accueil">Instagram \u00b7 @tina.bijoux1</a>
              <a href="#boutique">Notre collection</a>
              <a href="#avis">Laisser un avis</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="grace">\u00ab La gr\u00e2ce de Dieu \u00bb</p>
            <p style={{ marginTop: 6 }}>\u00a9 2026 Tina-Bijoux \u2014 Prototype r\u00e9alis\u00e9 pour SEG3525, Universit\u00e9 d'Ottawa.</p>
          </div>
        </div>
      </footer>

      <div className={'overlay ' + (drawerOpen ? 'open' : '')} onClick={() => setDrawerOpen(false)} />
      <CartDrawer
        open={drawerOpen} onClose={() => setDrawerOpen(false)}
        step={step} setStep={setStep}
        items={cartDetailed} setQty={setQty} removeItem={removeItem}
        subtotal={subtotal} shipping={shipping} total={total}
        orderId={orderId} placeOrder={placeOrder}
      />

      <div className={'toast ' + (toast ? 'show' : '')}><span className="dot">\u2726</span>{toast}</div>
    </>
  );
}

function CartDrawer({ open, onClose, step, setStep, items, setQty, removeItem, subtotal, shipping, total, orderId, placeOrder }) {
  const [info, setInfo] = useState({ nom: '', tel: '', ville: '', quartier: '' });
  const [pay, setPay] = useState({ num: '', exp: '', cvc: '', titulaire: '' });
  const [errs, setErrs] = useState({});

  const steps = ['Panier', 'Coordonn\u00e9es', 'Paiement', 'Confirm\u00e9'];

  const validateInfo = () => {
    const e = {};
    if (!info.nom.trim()) e.nom = 'Indiquez votre nom.';
    if (!/^[\d\s+]{8,}$/.test(info.tel)) e.tel = 'Num\u00e9ro de t\u00e9l\u00e9phone valide requis.';
    if (!info.ville.trim()) e.ville = 'Indiquez votre ville.';
    setErrs(e);
    return Object.keys(e).length === 0;
  };
  const validatePay = () => {
    const e = {};
    if (!/^[\d\s]{12,}$/.test(pay.num)) e.num = 'Num\u00e9ro de carte \u00e0 16 chiffres.';
    if (!/^\d{2}\/\d{2}$/.test(pay.exp)) e.exp = 'Format MM/AA.';
    if (!/^\d{3}$/.test(pay.cvc)) e.cvc = '3 chiffres.';
    if (!pay.titulaire.trim()) e.titulaire = 'Nom du titulaire requis.';
    setErrs(e);
    return Object.keys(e).length === 0;
  };

  return (
    <aside className={'drawer ' + (open ? 'open' : '')} aria-label="Panier et commande" aria-hidden={!open}>
      <div className="drawer-head">
        <h3>{step === 3 ? 'Merci\u202f!' : 'Votre commande'}</h3>
        <button className="drawer-close" onClick={onClose} aria-label="Fermer">\u00d7</button>
      </div>

      {step < 3 && (
        <div className="stepper">
          {steps.slice(0, 3).map((label, i) => (
            <div key={label} className={'step ' + (i === step ? 'active ' : '') + (i < step ? 'done' : '')}>
              <span className="step-dot">{i < step ? '\u2713' : i + 1}</span>
              <span className="step-label">{label}</span>
              {i < 2 && <span className="step-line" />}
            </div>
          ))}
        </div>
      )}

      {step === 0 && (
        <>
          <div className="drawer-body">
            {items.length === 0 ? (
              <div className="empty-state" style={{ padding: '50px 10px' }}>
                <div className="big">\ud83d\udecd\ufe0f</div>
                <p>Votre panier est vide.<br />Parcourez la collection pour le remplir.</p>
              </div>
            ) : items.map((it) => (
              <div key={it.id} className="cart-item">
                <div className="cart-item-media" style={{ background: 'var(--cream-warm)' }}>{it.glyph}</div>
                <div className="cart-item-info">
                  <div className="c">{it.cat}</div>
                  <div className="n">{it.name}</div>
                  <div className="qty">
                    <button onClick={() => setQty(it.id, -1)} aria-label="Retirer un">\u2212</button>
                    <span>{it.qty}</span>
                    <button onClick={() => setQty(it.id, +1)} aria-label="Ajouter un">+</button>
                  </div>
                  <button className="rm" onClick={() => removeItem(it.id)}>Retirer</button>
                </div>
                <div className="price">{fmt(it.price * it.qty)}</div>
              </div>
            ))}
          </div>
          {items.length > 0 && (
            <div className="drawer-foot">
              <div className="summary-row"><span>Sous-total</span><span>{fmt(subtotal)}</span></div>
              <div className="summary-row"><span>Livraison</span><span>{shipping === 0 ? 'Offerte' : fmt(shipping)}</span></div>
              <div className="summary-row total"><span>Total</span><span>{fmt(total)}</span></div>
              <button className="btn btn-primary" onClick={() => { setErrs({}); setStep(1); }}>Passer \u00e0 la commande</button>
            </div>
          )}
        </>
      )}

      {step === 1 && (
        <>
          <div className="drawer-body">
            <p className="form-note">Ces informations nous permettent de vous livrer et de vous pr\u00e9venir d\u00e8s que votre commande est pr\u00eate.</p>
            <div className="form-field">
              <label htmlFor="nom">Nom complet</label>
              <input id="nom" value={info.nom} onChange={(e) => setInfo({ ...info, nom: e.target.value })} placeholder="Ex. Tina A." />
              {errs.nom && <div className="field-err">{errs.nom}</div>}
            </div>
            <div className="form-field">
              <label htmlFor="tel">T\u00e9l\u00e9phone</label>
              <input id="tel" value={info.tel} onChange={(e) => setInfo({ ...info, tel: e.target.value })} placeholder="+229 ..." />
              {errs.tel && <div className="field-err">{errs.tel}</div>}
            </div>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="ville">Ville</label>
                <input id="ville" value={info.ville} onChange={(e) => setInfo({ ...info, ville: e.target.value })} placeholder="Cotonou" />
                {errs.ville && <div className="field-err">{errs.ville}</div>}
              </div>
              <div className="form-field">
                <label htmlFor="quartier">Quartier <span style={{ fontWeight: 400, color: 'var(--ink-soft)' }}>(facultatif)</span></label>
                <input id="quartier" value={info.quartier} onChange={(e) => setInfo({ ...info, quartier: e.target.value })} placeholder="Dantokpa..." />
              </div>
            </div>
          </div>
          <div className="drawer-foot">
            <div className="summary-row total"><span>Total</span><span>{fmt(total)}</span></div>
            <button className="btn btn-primary" onClick={() => validateInfo() && setStep(2)}>Continuer vers le paiement</button>
            <button className="btn btn-outline" style={{ width: '100%', marginTop: 10 }} onClick={() => setStep(0)}>Retour au panier</button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div className="drawer-body">
            <p className="form-note">\ud83d\udd12 D\u00e9monstration \u2014 aucune vraie transaction n'est effectu\u00e9e. Saisissez des chiffres quelconques.</p>
            <div className="form-field">
              <label htmlFor="titulaire">Titulaire de la carte</label>
              <input id="titulaire" value={pay.titulaire} onChange={(e) => setPay({ ...pay, titulaire: e.target.value })} placeholder="Nom sur la carte" />
              {errs.titulaire && <div className="field-err">{errs.titulaire}</div>}
            </div>
            <div className="form-field">
              <label htmlFor="num">Num\u00e9ro de carte</label>
              <input id="num" value={pay.num} onChange={(e) => setPay({ ...pay, num: e.target.value })} placeholder="0000 0000 0000 0000" inputMode="numeric" />
              {errs.num && <div className="field-err">{errs.num}</div>}
            </div>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="exp">Expiration</label>
                <input id="exp" value={pay.exp} onChange={(e) => setPay({ ...pay, exp: e.target.value })} placeholder="MM/AA" />
                {errs.exp && <div className="field-err">{errs.exp}</div>}
              </div>
              <div className="form-field">
                <label htmlFor="cvc">CVC</label>
                <input id="cvc" value={pay.cvc} onChange={(e) => setPay({ ...pay, cvc: e.target.value })} placeholder="123" inputMode="numeric" />
                {errs.cvc && <div className="field-err">{errs.cvc}</div>}
              </div>
            </div>
          </div>
          <div className="drawer-foot">
            <div className="summary-row"><span>Sous-total</span><span>{fmt(subtotal)}</span></div>
            <div className="summary-row"><span>Livraison</span><span>{shipping === 0 ? 'Offerte' : fmt(shipping)}</span></div>
            <div className="summary-row total"><span>\u00c0 payer</span><span>{fmt(total)}</span></div>
            <button className="btn btn-gold" onClick={() => validatePay() && placeOrder()}>Payer {fmt(total)}</button>
            <button className="btn btn-outline" style={{ width: '100%', marginTop: 10 }} onClick={() => setStep(1)}>Retour</button>
          </div>
        </>
      )}

      {step === 3 && (
        <div className="drawer-body">
          <div className="confirm">
            <div className="check">\u2713</div>
            <h3>Commande confirm\u00e9e</h3>
            <p>Merci pour votre confiance. Nous pr\u00e9parons vos bijoux avec soin.</p>
            <div className="order-id">Commande n\u00b0 {orderId}</div>
            <p>Vous recevrez un appel de Tina pour organiser la livraison.</p>
            <button className="btn btn-primary" style={{ marginTop: 22 }} onClick={onClose}>Continuer mes achats</button>
          </div>
        </div>
      )}
    </aside>
  );
}

function Survey({ onToast }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [tags, setTags] = useState([]);
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);

  const captions = ['', '\u00c0 am\u00e9liorer', 'Correct', 'Bien', 'Tr\u00e8s bien', 'Exceptionnel\u202f!'];
  const options = ['Le choix de bijoux', 'Les prix', 'La navigation', 'Le design du site', "L'accueil"];
  const toggleTag = (t) => setTags((x) => x.includes(t) ? x.filter((y) => y !== t) : [...x, t]);

  if (sent) {
    return (
      <section className="section survey-section" id="avis">
        <div className="container">
          <div className="survey-card">
            <div className="survey-thanks">
              <div className="big">\ud83d\udc9b</div>
              <h3>Merci du fond du c\u0153ur\u202f!</h3>
              <p>Votre retour aide Tina \u00e0 faire grandir la boutique. \u00c0 tr\u00e8s bient\u00f4t\u202f!</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section survey-section" id="avis">
      <div className="container">
        <div className="survey-card">
          <span className="eyebrow">Votre avis compte</span>
          <h2>Comment s'est pass\u00e9e votre visite\u202f?</h2>
          <p>Quelques secondes suffisent \u2014 dites-nous ce que vous avez ressenti chez Tina-Bijoux.</p>

          <div className="rate-row" role="radiogroup" aria-label="Note sur 5">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                className={'rate-star ' + ((hover || rating) >= n ? 'on' : '')}
                onClick={() => setRating(n)}
                onMouseEnter={() => setHover(n)}
                onMouseLeave={() => setHover(0)}
                aria-label={n + ' \u00e9toile' + (n > 1 ? 's' : '')}
                role="radio" aria-checked={rating === n}
              >\u2605</button>
            ))}
          </div>
          <div className="rate-caption">{captions[hover || rating]}</div>

          <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--ink-soft)', marginBottom: 12 }}>Qu'avez-vous le plus appr\u00e9ci\u00e9\u202f?</p>
          <div className="pill-row">
            {options.map((o) => (
              <button key={o} className={'pill ' + (tags.includes(o) ? 'on' : '')} onClick={() => toggleTag(o)}>{o}</button>
            ))}
          </div>

          <div className="form-field">
            <label htmlFor="msg">Un mot pour Tina\u202f? <span style={{ fontWeight: 400, color: 'var(--ink-soft)' }}>(facultatif)</span></label>
            <textarea id="msg" rows="3" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Partagez votre exp\u00e9rience..." />
          </div>

          <button
            className="btn btn-gold" style={{ width: '100%', marginTop: 6 }}
            disabled={rating === 0}
            onClick={() => { setSent(true); onToast('Merci pour votre avis\u202f!'); }}
          >
            {rating === 0 ? 'Choisissez une note pour envoyer' : 'Envoyer mon avis'}
          </button>
        </div>
      </div>
    </section>
  );
}
