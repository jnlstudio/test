'use client';

import {useEffect,useRef,useState} from 'react';
import {ArrowDown,ArrowRight,ArrowUpRight,Plus,X} from 'lucide-react';
import {Dialog,DialogContent,DialogDescription,DialogTitle} from '@/components/ui/dialog';
import {products,type Product} from '@/lib/catalog';

function ProductImage({product,priority=false}:{product:Product;priority?:boolean}){
  return <img src={product.image} alt={`${product.name} — ${product.colour.toLowerCase()} ${product.category.toLowerCase()}`} width="896" height="1200" loading={priority?'eager':'lazy'} fetchPriority={priority?'high':'auto'} decoding="async"/>;
}

const storyProducts=[products[0],products[0],products[1],products[5]];
const discoveries=[products[2],products[4],products[6]];

export default function Home(){
  const root=useRef<HTMLElement>(null);
  const [selected,setSelected]=useState<Product|null>(null);

  useEffect(()=>{
    let cleanup=()=>{};
    let alive=true;
    Promise.all([import('gsap'),import('gsap/ScrollTrigger')]).then(([gsapModule,triggerModule])=>{
      if(!alive||!root.current)return;
      const gsap=gsapModule.gsap;
      const ScrollTrigger=triggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      const media=gsap.matchMedia();
      const context=gsap.context(()=>{
        gsap.set('.story-layer',{autoAlpha:0});
        gsap.set('.story-layer-0',{autoAlpha:1});
        gsap.set('.story-copy',{autoAlpha:0,y:32});
        gsap.set('.story-copy-0',{autoAlpha:1,y:0});

        media.add('(min-width: 821px) and (prefers-reduced-motion: no-preference)',()=>{
          const timeline=gsap.timeline({
            defaults:{ease:'none'},
            scrollTrigger:{trigger:'.story',start:'top top',end:'bottom bottom',scrub:0.85,pin:'.story-stage',anticipatePin:1}
          });
          timeline
            .to('.story-layer-0 img',{scale:1.16,duration:1.1})
            .to('.story-word-left',{xPercent:-12,duration:1.1},'<')
            .to('.story-word-right',{xPercent:12,duration:1.1},'<')
            .to('.story-copy-0',{autoAlpha:0,y:-24,duration:.25})
            .to('.story-layer-0',{autoAlpha:0,duration:.35},'<')
            .fromTo('.story-layer-2',{autoAlpha:0,scale:.9},{autoAlpha:1,scale:1,duration:.65})
            .to('.story-copy-2',{autoAlpha:1,y:0,duration:.45},'<+.15')
            .to('.story-layer-2',{xPercent:-18,scale:1.08,duration:1})
            .to('.story-copy-2',{autoAlpha:0,y:-24,duration:.25})
            .to('.story-layer-2',{autoAlpha:0,duration:.3},'<')
            .fromTo('.story-layer-3',{autoAlpha:0,xPercent:25,rotate:4},{autoAlpha:1,xPercent:14,rotate:0,duration:.7})
            .to('.story-copy-3',{autoAlpha:1,y:0,duration:.5},'<+.1')
            .to('.story-word-left',{xPercent:-24,duration:1},'<')
            .to('.story-word-right',{xPercent:24,duration:1},'<')
            .to('.story-copy-3',{autoAlpha:0,y:-24,duration:.25})
            .to('.story-layer-3',{autoAlpha:0,scale:1.08,duration:.35},'<')
            .fromTo('.story-layer-4',{autoAlpha:0,scale:.82,rotate:-5},{autoAlpha:1,scale:1,rotate:0,duration:.75})
            .to('.story-copy-4',{autoAlpha:1,y:0,duration:.5},'<+.1')
            .to('.story-layer-4',{yPercent:-4,scale:1.04,duration:1});
        });

        media.add('(max-width: 820px)',()=>{
          gsap.set('.story-layer,.story-copy',{clearProps:'all'});
        });

        media.add('(prefers-reduced-motion: no-preference)',()=>{
          gsap.utils.toArray<HTMLElement>('.reveal').forEach((element)=>{
            gsap.fromTo(element,{autoAlpha:0,y:55},{autoAlpha:1,y:0,duration:.85,ease:'power3.out',scrollTrigger:{trigger:element,start:'top 86%',once:true}});
          });
          gsap.utils.toArray<HTMLElement>('.discovery-image img').forEach((image)=>{
            gsap.fromTo(image,{scale:1.08},{scale:1,ease:'none',scrollTrigger:{trigger:image.parentElement,start:'top bottom',end:'bottom top',scrub:true}});
          });
          gsap.to('.marquee-line',{xPercent:-18,ease:'none',scrollTrigger:{trigger:'.marquee',start:'top bottom',end:'bottom top',scrub:true}});
        });
      },root);
      cleanup=()=>{media.revert();context.revert()};
    });
    return()=>{alive=false;cleanup()};
  },[]);

  return <main ref={root}>
    <a className="skip-link" href="#collection">Skip to the collection</a>
    <header className="site-header">
      <a href="#top" className="wordmark" aria-label="JNL Studio home">JNL STUDIO</a>
      <nav aria-label="Main navigation"><a href="#story">STORY</a><a href="#collection">OBJECTS</a><a href="#studio">STUDIO</a></nav>
      <a className="header-contact" href="#invite">MARKET ENQUIRIES <ArrowUpRight size={15}/></a>
    </header>

    <section className="story" id="story" aria-label="JNL Studio product story">
      <div className="story-stage" id="top">
        <div className="story-words" aria-hidden="true"><span className="story-word-left">JNL</span><span className="story-word-right">STUDIO</span></div>
        <div className="story-meta"><span>INDEPENDENT DESIGN STUDIO</span><span>UNITED KINGDOM / 2026</span></div>
        {storyProducts.map((product,index)=><button key={`${product.id}-${index}`} className={`story-layer story-layer-${index===0?0:index+1}`} onClick={()=>setSelected(product)} aria-label={`View ${product.name}`}>
          <ProductImage product={product} priority={index===0}/><span className="story-object-no">0{index+1}</span><span className="story-open"><Plus size={17}/></span>
        </button>)}
        <div className="story-copy story-copy-0"><span className="eyebrow">OBJECT 01 / SMALL BATCH</span><h1>WE MAKE<br/>WEIRD LITTLE<br/>THINGS.</h1><p>Expressive objects with something to say.</p></div>
        <div className="story-copy story-copy-2"><span className="eyebrow">OBJECTS WITH PERSONALITY</span><h2>BIG FEELINGS.<br/>SMALL OBJECT.</h2><p>Colour, character and a little everyday humour.</p></div>
        <div className="story-copy story-copy-3"><span className="eyebrow">A GOOD KIND OF STRANGE</span><h2>MADE TO<br/>START A<br/>CONVERSATION.</h2></div>
        <div className="story-copy story-copy-4"><span className="eyebrow">DESIGNED · PRINTED · FINISHED</span><h2>HAND-FINISHED<br/>DESIGN OBJECTS.</h2><p>Layer by layer. Detail by detail.</p></div>
        <a className="story-scroll" href="#collection"><ArrowDown size={18}/> SCROLL TO DISCOVER</a>
        <div className="story-progress" aria-hidden="true"><i/><span>01</span><span>04</span></div>
      </div>
    </section>

    <section className="marquee" aria-hidden="true"><div className="marquee-line">OBJECTS WITH PERSONALITY. <i>✦</i> SMALL BATCH. BIG CHARACTER. <i>✦</i> OBJECTS WITH PERSONALITY.</div></section>

    <section className="discovery" id="collection">
      <div className="section-intro reveal"><span className="eyebrow">THREE OBJECTS / THREE MOODS</span><h2>FIND THE ONE<br/>THAT SOUNDS<br/><em>LIKE YOU.</em></h2><p>Each design turns a familiar feeling into something colourful, tactile and easy to carry.</p></div>
      {discoveries.map((product,index)=><article className={`discovery-item discovery-${index+1}`} key={product.id}>
        <button className="discovery-image" onClick={()=>setSelected(product)} aria-label={`Explore ${product.name}`}><ProductImage product={product}/><span>OPEN OBJECT <Plus size={18}/></span></button>
        <div className="discovery-copy reveal"><span className="discovery-number">0{index+1}<small>/ 03</small></span><span className="eyebrow">{product.category}</span><h3>{product.name}</h3><p>{product.description}</p><button className="arrow-link" onClick={()=>setSelected(product)}>EXPLORE THE DETAILS <ArrowUpRight size={19}/></button></div>
      </article>)}
    </section>

    <section className="studio" id="studio">
      <div className="studio-heading reveal"><span className="eyebrow">JNL STUDIO / ABOUT</span><h2>SMALL OBJECTS.<br/>STRANGE THOUGHTS.<br/><em>MADE BY HAND.</em></h2></div>
      <div className="studio-grid">
        <p className="studio-lede reveal">Designed to make<br/>the everyday<br/>less boring.</p>
        <div className="studio-copy reveal"><p>JNL STUDIO is an independent UK design studio creating expressive keychains and small design objects in limited batches.</p><p>Playful typography, tactile layers and relatable messages give every piece a clear personality. They are compact enough to carry and distinctive enough to stop people in their tracks.</p></div>
        <figure className="studio-photo"><ProductImage product={products[3]}/><figcaption>DOING MY BEST / HAND-FINISHED DETAIL</figcaption></figure>
      </div>
      <div className="process-list">
        {['DESIGNED','PRINTED','FINISHED','READY TO MEET'].map((step,index)=><div key={step}><span>0{index+1}</span><strong>{step}</strong><ArrowRight/></div>)}
      </div>
    </section>

    <section className="full-collection" aria-label="Full JNL Studio collection">
      <div className="collection-heading reveal"><span className="eyebrow">THE MARKET COLLECTION / 001—007</span><h2>MEET THE<br/><em>WEIRD ONES.</em></h2><p>Seven messages. Seven small ways to make someone stop, smile and look closer.</p></div>
      <div className="collection-track">
        {products.map((product,index)=><button className="collection-object" key={product.id} onClick={()=>setSelected(product)}>
          <span className="collection-photo"><ProductImage product={product}/><i>0{index+1}</i></span>
          <strong>{product.name}</strong><small>{product.category}</small>
        </button>)}
      </div>
      <p className="swipe-note">SWIPE TO MEET THEM ALL <ArrowRight size={16}/></p>
    </section>

    <section className="organisers" id="invite">
      <div className="organiser-label"><span className="eyebrow">FOR MARKET ORGANISERS & CURATORS</span><span className="eyebrow">AVAILABLE ACROSS THE UK</span></div>
      <h2 className="reveal">A STALL PEOPLE<br/>WILL WANT TO<br/><em>LOOK CLOSER AT.</em></h2>
      <div className="organiser-body">
        <div className="organiser-visual"><ProductImage product={products[0]}/><span className="organiser-stamp">SMALL<br/>BATCH<br/><i>✦</i></span></div>
        <div className="organiser-copy reveal"><p className="large">A recognisable collection built for discovery, conversation and gifting.</p><div className="organiser-points"><p><span>01</span><strong>Distinct from a distance</strong>Bold colour and type make the collection easy to spot across a busy market.</p><p><span>02</span><strong>Rewarding up close</strong>Raised lettering and layered details invite people to pick up and explore.</p><p><span>03</span><strong>Easy to connect with</strong>Relatable messages turn browsing into conversation.</p></div></div>
      </div>
      <div className="market-profile"><div><span>BASED IN</span><strong>UNITED KINGDOM</strong></div><div><span>PRODUCT FOCUS</span><strong>KEYCHAINS & SMALL OBJECTS</strong></div><div><span>PRODUCTION</span><strong>SMALL BATCH · HAND-FINISHED</strong></div><div><span>LOOKING FOR</span><strong>DESIGN MARKETS · POP-UPS · MAKER FAIRS</strong></div></div>
    </section>

    <section className="final-cta-section">
      <div className="final-words" aria-hidden="true">JNL<br/>STUDIO</div>
      <div className="final-copy reveal"><span className="eyebrow">LET'S BRING SOMETHING DIFFERENT TO YOUR EVENT.</span><h2>MEET US<br/>AT YOUR<br/><em>MARKET.</em></h2><a className="primary-cta" href="mailto:jnlstudio.design@gmail.com?subject=Market%20invitation%20for%20JNL%20STUDIO">INVITE JNL STUDIO <ArrowUpRight/></a><a className="email-link" href="mailto:jnlstudio.design@gmail.com">jnlstudio.design@gmail.com</a></div>
      <div className="final-products"><button onClick={()=>setSelected(products[5])}><ProductImage product={products[5]}/></button><button onClick={()=>setSelected(products[1])}><ProductImage product={products[1]}/></button></div>
    </section>

    <footer><a href="#top" className="wordmark">JNL STUDIO</a><p>INDEPENDENT MINDS. UNEXPECTED OBJECTS.</p><a href="#top">BACK TO TOP <ArrowUpRight size={15}/></a><span>© 2026 / UNITED KINGDOM</span></footer>

    <Dialog open={selected!==null} onOpenChange={(open)=>{if(!open)setSelected(null)}}>
      <DialogContent className="object-dialog" showCloseButton={false}>{selected&&<>
        <button className="dialog-close" onClick={()=>setSelected(null)} aria-label="Close object details"><X/></button>
        <div className="detail-image"><ProductImage product={selected}/></div>
        <div className="detail-copy"><span className="eyebrow">OBJECT {selected.number} / JNL STUDIO</span><DialogTitle>{selected.name}</DialogTitle><DialogDescription>{selected.detail}</DialogDescription><dl><div><dt>OBJECT</dt><dd>{selected.category}</dd></div><div><dt>COLOUR</dt><dd>{selected.colour}</dd></div><div><dt>MADE</dt><dd>SMALL BATCH / HAND-FINISHED</dd></div></dl><a href="mailto:jnlstudio.design@gmail.com?subject=JNL%20STUDIO%20collection%20enquiry" className="arrow-link">ASK ABOUT THE COLLECTION <ArrowUpRight size={18}/></a></div>
      </>}</DialogContent>
    </Dialog>
  </main>;
}
