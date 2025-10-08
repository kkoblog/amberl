"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

// セクションヘッダーのコンポーネント化
const SectionHeader = ({ title, subtitle, underlineColor }) => (
  <div className="relative mb-8 md:mb-12 px-4">
    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-black">
      <span className="relative inline-block pb-4">
        {title}
        <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#9cc812]"></span>
      </span>
    </h2>
    {subtitle && (
      <p className="mt-6 text-sm md:text-lg lg:text-xl text-gray-600 text-center">
        {subtitle}
      </p>
    )}
  </div>
);

// もしくは別のデザインバージョン
const SectionHeader2 = ({ title, subtitle }) => (
  <div className="relative mb-12 md:mb-16 px-4">
    <h2 className="relative inline-block text-2xl md:text-3xl lg:text-4xl font-bold text-center w-full">
      <span className="relative z-10">{title}</span>
      <span className="absolute left-0 bottom-1 w-full h-3 bg-rose-200/30 -rotate-1 z-0"></span>
    </h2>
    {subtitle && (
      <p className="mt-6 text-sm md:text-base text-gray-600 text-center">
        {subtitle}
      </p>
    )}
  </div>
);

// カラーパレットの定義
const colors = {
  primary: {
    bg: 'bg-white',      // 背景色を白に変更
    text: 'text-[#4a4a4a]',  // ダークグレー
    accent: 'bg-[#9cc812]',  // 新しいアクセントカラー
  },
  secondary: {
    light: 'bg-[#fdfbf9]',   // オフホワイト
    border: 'border-[#e8e2dc]', // ライトベージュ
    hover: 'hover:bg-[#f3efe9]', // ホバー時のベージュ
  }
};

// Instagramの埋め込みを最適化
const InstagramEmbed = ({ url }) => {
  return (
    <div className="w-full aspect-[9/16] max-w-[280px] mx-auto">
      <iframe 
        src={url}
        className="w-full h-full"
        frameBorder="0" 
        scrolling="no" 
        allowtransparency="true"
      />
    </div>
  );
};

// スタッフカードコンポーネントの作成
const StaffCard = ({ image, name, position, message }) => {
  return (
    <div className="bg-[#f5f5f5] p-4 md:p-8 rounded-xl shadow-sm">
      <div className="bg-white/80 p-6 rounded-xl shadow-sm h-full flex flex-col">
        <div className="flex items-center space-x-2 mb-4">
          <i className="fas fa-quote-left text-[#D3B58D] text-xl"></i>
          <span className="text-[#D3B58D] font-medium"></span>
        </div>
        
        <div className="flex items-center mb-6">
          <div className="w-24 h-24 md:w-28 md:h-28 overflow-hidden rounded-full border-4 border-white shadow-md mr-4 flex-shrink-0">
            <Image
              src={image}
              alt={`スタッフ${name}`}
              width={128}
              height={128}
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div>
            <p className="font-bold text-lg">{name}</p>
            <p className="text-sm text-gray-600">{position}</p>
          </div>
        </div>
        
        <div className="space-y-4 mb-6">
          <p className="text-gray-700 leading-relaxed mb-6">
            {message}
          </p>
          
          {name === "峯 琴奈" ? (
            <>
              <p className="text-gray-700 leading-relaxed mb-6">
  でも<span className="font-bold text-[#D3B58D]">amberlに入社して</span>、
  <span className="bg-[#D3B58D]/10 px-2 py-1 rounded inline-block mt-1">
    マンツーマンサロンならではの、お客様一人一人との丁寧な関わりを学ぶことができました。
    アットホームな雰囲気の中、スタッフ同士も仲が良く、分からないことも親切に教えてもらえる環境です。
  </span>
</p>

<p className="text-gray-700 leading-relaxed mb-6">
  自宅からの通いやすさに加えて、
  <span className="border-b-2 border-[#D3B58D]">
    完全週休2日で月8〜9日休めるメリハリのある働き方でプライベートも充実。お客様とスタッフの関係性も深く、安心して働ける環境です。
  </span>
</p>

<p className="text-gray-700 leading-relaxed mb-6">
  <span className="bg-[#D3B58D]/10 px-2 py-1 rounded inline-block mt-1">
    スタッフ一人一人が生き生きと働けるサロンで、毎日がやりがいに満ちています。
  </span>
</p>
            </>
          ) : (
            <>

              <p className="text-gray-700 leading-relaxed mb-6">
                <span className="font-bold text-[#D3B58D]">学んだこと</span>
                <span className="bg-[#D3B58D]/10 px-2 py-1 rounded inline-block mt-1">
                  スタイリストそれぞれが得意とするスタイルが異なるため、お互いのテクニックやアプローチ方法を学び合える環境です。
                  気軽にアドバイスを求められる雰囲気があり、日々新しい発見があります。
                </span>
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                <span className="font-bold text-[#D3B58D]">お店の雰囲気</span>
                <span className="bg-[#D3B58D]/10 px-2 py-1 rounded inline-block mt-1">
                  店内には木と植物がたくさんあり、落ち着いた雰囲気が特徴です。
                  新規のお客様からも「リラックスできる空間ですね」と嬉しいお言葉をいただいています。
                  大人女性のお客様が中心で、普段は落ち着いた雰囲気ですが、楽しい会話で盛り上がると自然と明るく賑やかな空間に。
                  そんなメリハリのある雰囲気も魅力の一つです。
                </span>
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                <span className="font-bold text-[#D3B58D]">求人を見ている方に一言</span>
                <div className="space-y-3 bg-[#D3B58D]/10 px-2 py-1 rounded mt-1">
                  <p className="flex items-start">
                    
                    <span>
                      以前の職場と比べてゆったりとした働き方になったにも関わらず、売上は1.5倍に伸びました。
                      心に余裕を持って働けることで、より良い施術ができています。
                    </span>
                  </p>
                  <p className="pl-4 border-l-2 border-[#D3B58D]/20">
                    自分の得意分野を活かした技術メニューやクーポンを自由に提案できる環境があり、
                    スタイリストとしての創造性を発揮できます。
                  </p>
                  <p className="pl-4 border-l-2 border-[#D3B58D]/20">
                    スタッフ同士の仲が良く、飲み会などのイベントも参加は完全に自由。
                    一人一人の意思が尊重される働きやすい環境です。
                  </p>
                </div>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// スライドショーコンポーネントを追加
const ImageSlideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFirstView, setIsFirstView] = useState(true);
  const { ref: slideRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  const images = [
    {
      src: "/image/t1.jpeg",
      alt: "店内の様子"
    },
    {
      src: "/image/t2.jpeg",
      alt: "店内の様子"
    },
    {
      src: "/image/t3.jpeg",
      alt: "店内の様子"
    },
    {
      src: "/image/t4.jpeg",
      alt: "店内の様子"
    },
    {
      src: "/image/gaikan1.JPG",
      alt: "外観の様子"
    },
  ];

  useEffect(() => {
    let timer;
    if (inView) {
      if (isFirstView) {
        setIsFirstView(false);
        timer = setTimeout(() => {
          setCurrentImageIndex(1);
          timer = setInterval(() => {
            setCurrentImageIndex((prevIndex) => 
              prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
          }, 3000);
        }, 1000);
      } else {
        timer = setInterval(() => {
          setCurrentImageIndex((prevIndex) => 
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
          );
        }, 3000);
      }
    }
    return () => {
      clearTimeout(timer);
      clearInterval(timer);
    };
  }, [inView, isFirstView, images.length]);

  return (
    <div 
      ref={slideRef}
      className="relative w-full aspect-[16/9] overflow-hidden shadow-lg max-h-[600px]"
    >
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-transform duration-700 ease-in-out ${
            index === currentImageIndex 
              ? 'translate-x-0 opacity-100 visible' 
              : index < currentImageIndex
                ? '-translate-x-full opacity-0 invisible'
                : 'translate-x-full opacity-0 invisible'
          }`}
          style={{
            zIndex: index === currentImageIndex ? 1 : 0,
            transitionProperty: 'transform, opacity, visibility'
          }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover object-center"
            priority={index === 0}
            quality={85}
          />
        </div>
      ))}
      
      {/* インジケーター */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentImageIndex === index 
                ? 'bg-white scale-110' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`スライド ${index + 1} へ移動`}
          />
        ))}
      </div>
    </div>
  );
};

function MainComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 各セクションのIntersectionObserverを設定
  const [conceptRef, conceptInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: '-50px'
  });
  const [staffRef, staffInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: '-50px'
  });
  const [requirementsRef, requirementsInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: '-50px'
  });
  const [qaRef, qaInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: '-50px'
  });
  const [ownerRef, ownerInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: '-50px'
  });

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 悩みセクションの各項目用のIntersectionObserver
  const concerns = [
    "産後、低単価サロンなら簡単だと思い入社",
    "教育時間は営業時間外で疲弊💦即戦力として求められる💦",
    "自信がないまま、1人で5〜7名をこなさなければならず疲弊💦\n子どもが発熱、予約を代わってもらえず無理やり保育園へ入れる毎日💦",
    "仕事をこなすことに精一杯で駒のように感じる💦",
  ];

  const concernRefs = concerns.map(() => useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: '-50px'
  }));

  // アニメーション用のIntersectionObserver設定を確認
  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
    threshold: 0.1, // より早くトリガーされるように閾値を下げる
    rootMargin: '-50px'
  });

  // アニメーションクラスの定義を確認
  const fadeInUpClass = 'transition-all duration-1000 ease-out';
  const fadeInUpAnimation = (inView) => 
    `${fadeInUpClass} ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`;

  // 特徴セクション用のIntersectionObserver設定を追加
  const { ref: featuresRef, inView: featuresInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-50px'
  });

  const RequirementSection = () => {
    const requirements = [
      {
        main: "ゆとりある働き方をしたい",
        sub: "1日最大5名までのゆとりある働き方で、疲弊することなく働きたい方"
      },
      {
        main: "自分の強みを活かして、好きなことを追求したい",
        sub: "自分らしい創造性を活かしたスタイリングを追求したい方"
      },
      {
        main: "難しいメニューは苦手",
        sub: "特殊な技術に特化せず、基本に忠実な施術で活躍したい方"
      },
      {
        main: "将来、独立をしたい",
        sub: "正社員から業務委託まで、ライフスタイルに合わせた働き方を選択できます"
      },
      
    ];

    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.2,
      rootMargin: '-50px'
    });

    return (
      <section className="py-16 md:py-24 bg-white">
        <SectionHeader 
          title="求める人材"
          subtitle="私たちと一緒に働きませんか？"
        />

    
        
        <div className="max-w-6xl mx-auto px-4">
          <div 
            ref={ref}
            className={`space-y-6 transition-all duration-700 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {requirements.map((req, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 bg-[#D3B58D]/20 rounded-full flex items-center justify-center">
                      <span className="text-black text-sm font-medium">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2 w-full">
                    <p className="text-base md:text-lg font-bold text-black">
                      {req.main}
                    </p>
                    <p className="text-sm md:text-base text-gray-600">
                      {req.sub}
                    </p>
                    {req.images && (
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {req.images.map((img, imgIndex) => (
                          <div key={imgIndex} className="space-y-2">
                            <div className="relative aspect-video">
                              <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className="object-cover rounded-lg"
                              />
                            </div>
                            <p className="text-sm text-gray-600 text-center font-medium">
                              {img.caption}
                            </p>
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {img.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          

          
        </div>
      </section>
    );
  };

  // 悩みセクション用のIntersectionObserver設定を調整
  const { ref: concernsRef, inView: concernsInView } = useInView({
    triggerOnce: true,
    threshold: 0.05, // より早くトリガーされるように閾値を下げる
    rootMargin: '-10px' // マージンを小さくしてより早くトリガー
  });

  // useEffectを追加（returnの前に配置）
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollPercentage = (scrollPosition / windowHeight) * 100;

      // メインコンテンツのアニメーション
      const elements = document.querySelectorAll('.opacity-0:not(.instagram-tab)');
      if (scrollPercentage >= 20) {
        elements.forEach(element => {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        });
      }

      // インスタグラムタブの表示制御
      const instagramTab = document.querySelector('.instagram-tab');
      if (instagramTab) {
        if (scrollPosition > windowHeight * 0.8) { // 画面の80%以上スクロールしたら表示
          instagramTab.style.opacity = '1';
          instagramTab.style.visibility = 'visible';
          instagramTab.style.transform = 'translateX(calc(100% - 40px))';
        } else {
          instagramTab.style.opacity = '0';
          instagramTab.style.visibility = 'hidden';
          instagramTab.style.transform = 'translateX(100%)';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-noto-sans relative">
      {/* ヘッダー */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center px-4 h-16">
            <div className="text-xl font-bold">
              amberl
            </div>
            {/* PC用ナビゲーション */}
            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                <li><a href="#concept" className="hover:text-[#D3B58D] transition-colors duration-300">amberlで働くことで得られる事</a></li>
                <li><a href="#staff" className="hover:text-[#D3B58D] transition-colors duration-300">スタッフ紹介</a></li>
                <li><a href="#requirements" className="hover:text-[#D3B58D] transition-colors duration-300">募集要項</a></li>
                <li><a href="#qa" className="hover:text-[#D3B58D] transition-colors duration-300">よくある質問</a></li>
                <li><a href="#owner-message" className="hover:text-[#D3B58D] transition-colors duration-300">オーナー挨拶</a></li>
              </ul>
            </nav>
            {/* モバイル用ハンバーガーメニュー */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
              aria-label="メニュー"
            >
              <div className="w-6 h-4 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                <span className={`w-full h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-full h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
        
        {/* モバイル用メニュー */}
        <div className={`md:hidden fixed top-16 left-0 right-0 bg-white shadow-lg transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
          <nav className="p-4">
            <ul className="space-y-4">
              <li><a href="#concept" className="block py-2" onClick={() => setIsMenuOpen(false)}>amberlで働くことで得られる事</a></li>
              <li><a href="#staff" className="block py-2" onClick={() => setIsMenuOpen(false)}>スタッフ紹介</a></li>
              <li><a href="#requirements" className="block py-2" onClick={() => setIsMenuOpen(false)}>募集要項</a></li>
              <li><a href="#qa" className="block py-2" onClick={() => setIsMenuOpen(false)}>よくある質問</a></li>
              <li><a href="#owner-message" className="block py-2" onClick={() => setIsMenuOpen(false)}>オーナー挨拶</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* インスタグラムリンクタブ（モバイル用） */}
      <a
        href="https://www.instagram.com/amberl202467"
        target="_blank"
        rel="noopener noreferrer"
        className="instagram-tab fixed top-20 right-0 z-50 bg-gradient-to-tr from-[#FFD600] via-[#FF7A00] via-[#FF0069] via-[#D300C5] to-[#7638FA] text-white p-3 rounded-l-lg shadow-lg transform translate-x-full hover:translate-x-0 transition-all duration-300 md:hidden opacity-0 invisible"
        style={{ animationFillMode: 'forwards' }}
      >
        <i className="fab fa-instagram text-2xl"></i>
      </a>

      {/* ファーストビュー */}
      <div className="pt-16">
        <div className="relative">
          <div className="w-full">
            <Image
              src="/image/top.jpeg"
              alt="明るく清潔感のあるサロン内装"
              width={1200}
              height={600}
              className="md:w-full md:h-[80vh] w-screen h-auto object-cover"
              priority
            />
            {/* メッセージのオーバーレイ */}
            <div className="absolute inset-0 flex items-center">
              <div className="text-white px-0 md:px-12 ml-4 md:hidden"> {/* md:hidden を追加してPCでは非表示に */}
                <h1 className="text-2xl md:text-3xl font-medium tracking-wider leading-relaxed mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] text-shadow-strong">
                  “ストレスフリーな美容師LIFE“<br />
                  美容師として輝きながら、<br />
                  プライベートも大切に。<br />
                  自分の理想的な美容師人生へ。
                </h1>
              </div>
            </div>
            <Image
              src="/image/zentai.jpeg"
              alt="amberlスタッフ集合写真"
              width={1200}
              height={600}
              className="md:w-full md:h-[80vh] w-screen h-auto object-cover"
              priority
            />
          </div>
        </div>
        {/* メッセージセクション */}
        <div className="py-12 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {/* 最初のメッセージ */}
              <div className="text-left">
                <h1 className="text-2xl md:text-3xl font-medium tracking-wider leading-relaxed mb-3 opacity-0 translate-y-10 transition-all duration-1000 ease-out" style={{ animationFillMode: 'forwards' }}>
                “ストレスフリーな美容師LIFE“<br />
                美容師として輝きながら、<br />
                  プライベートも大切に。<br />
                  自分の理想的な美容師人生へ。
                </h1>
              </div>

              {/* 2番目のメッセージ */}
              <div className="text-left">
                <p className="text-base md:text-lg leading-loose tracking-wider opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-300" style={{ animationFillMode: 'forwards' }}>
                  安心して自分らしい働き方を実現<br />
                  大好きな美容師の仕事が、<br />長く続けられるサロン。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* セクション間のセパレーター */}
      <div className="w-full h-4 bg-white"></div>

      {/* 以降の既存のセクション */}

      <section className="py-8 md:py-12 mt-4 md:mt-6 bg-white">
        <div className="relative z-10">
          <SectionHeader 
            title={<>多くの美容師が抱える悩み事、<br />当サロンでは一切致しません</>}
            subtitle="現場で美容師を困らせがちな環境や課題"
            underlineColor="#D3B58D"
          />
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 gap-2 md:gap-8">
              {/* 左側: 一般的な美容室の悩み */}
              <div className="p-2 md:p-6 rounded-lg h-full flex flex-col">
                <h3 className="text-base md:text-xl font-bold text-center mb-3 md:mb-6 text-gray-500">＜他店での悩み＞</h3>
                <div className="flex flex-col items-center gap-2 md:gap-4 flex-grow">
                  {[
                    "「スタイリストになったのに...」\n先輩の手伝いばかりで、自分の入客の時間がもらえない💦",
                    "「結婚後の生活が不安...」朝から夜遅くまで働き、勤務終了後は後輩の面倒を見ないといけない💦",
                    "「技術を磨きたいのに...」\nシャンプー、ブロー、掃除に追われる毎日💦",
                    "「こんなはずじゃなかった...」\n早く帰るスタッフは冷たい目で見られ、残業が当たり前の雰囲気💦",
                    "「将来が見えない...」\n長時間労働で疲弊し、プライベートも充実できず、美容師としての成長も停滞💦"
                  ].map((concern, index) => (
                    <React.Fragment key={index}>
                      <div className="border-2 border-gray-200 rounded-lg p-2 md:p-4 w-full text-left bg-white shadow-sm text-xs md:text-base leading-relaxed text-gray-600 min-h-[120px] md:min-h-[140px] flex items-center justify-start px-4 md:px-6 whitespace-pre-wrap">
                        {concern}
                      </div>
                      {index < 4 && (
                        <div className="text-gray-400 text-base md:text-2xl">
                          ↓
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* 右側: amberlの場合 */}
              <div className="p-2 md:p-6 rounded-lg h-full flex flex-col">
                <h3 className="text-base md:text-xl font-bold text-center mb-3 md:mb-6 text-black">＜amberlの場合＞</h3>
                <div className="flex flex-col items-center gap-2 md:gap-4 flex-grow">
                  {[
                    "あなたのワークバランスを考えた働き方を提案・提供✨ ",
                    "マンツーマンでゆとりある働き方\n1日最大5名まで✨",
                    "家族・プライベートの時間がつくれる\n完全週休2日制（毎週月曜＋希望日、土日休み可）✨",
                    "ストレスフリーな生涯現役美容師ライフ\n社保完備、産休・育休取得率100%、時短勤務OK✨",
                    "スタイリスト見習いでも安心の環境\n入社1年目でも月収25-30万円、入社初月70〜80名入客実績あり✨"
                  ].map((solution, index) => (
                    <React.Fragment key={index}>
                      <div className="border-2 border-[#9cc812] rounded-lg p-2 md:p-4 w-full text-left bg-white shadow-sm text-xs md:text-base leading-relaxed min-h-[120px] md:min-h-[140px] flex items-center justify-start px-4 md:px-6 whitespace-pre-wrap">
                        {solution}
                      </div>
                      {index < 4 && (
                        <div className="text-[#9cc812] text-base md:text-2xl">
                          ↓
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* セクション間のセパレーター */}
      <div className="w-full h-16 bg-white"></div>

      {/* 特徴セクション */}
      <div className="mt-4 bg-white relative overflow-hidden">
        <div className="relative z-10">
          <SectionHeader 
            title="amberlの特徴"
          />
         
          <div className="mt-8 md:mt-12">
            <div 
              className={`w-full max-w-4xl mx-auto transition-all duration-1000 ${
                featuresInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <ImageSlideshow />
            </div>
          </div>

          <br />

          <div 
            ref={featuresRef}
            className="text-base md:text-xl leading-relaxed text-center max-w-3xl mx-auto space-y-6"
          >
            <div 
              className={`bg-white rounded-lg p-6 shadow-md border border-[#D3B58D]/20 hover:shadow-lg transition-all duration-700 ${
                featuresInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              <span className="text-[#D3B58D] font-bold text-lg">①</span>
              女性美容師が活躍できる環境
              
              <br />
              <br />
              <span className="text-gray-700 text-sm md:text-base">
                20代〜40代の女性スタイリストが活躍中。
                <br />
                子育て中のママさんスタイリストも多数在籍。
                <br />
                お客様の年齢層も同世代が多く、
                <br />
                ライフスタイルの共感から生まれる信頼関係を
                <br />
                築きやすい環境です
                <br />
                
              </span>
            </div>

            <div 
              className={`bg-white rounded-lg p-6 shadow-md border border-[#D3B58D]/20 hover:shadow-lg transition-all duration-700 ${
                featuresInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <span className="text-[#D3B58D] font-bold text-lg">②</span>
              ワークライフバランスを
              <br />
              考えた働き方ができます
              <br />
              <br />
              <span className="text-gray-700 text-sm md:text-base">
                <span className="text-[#D3B58D] font-medium">
                  お一人お一人と向き合える環境
                </span>
                で、
                <br />
                1日最大5名までのゆとりのある施術
                <br />
                急いで次のお客様に移ることなく、
                <br />
                <span className="bg-[#D3B58D]/10 px-2 py-1 rounded inline-block mt-1">
                  理想の美容師ライフを実現できます
                </span>
              </span>
            </div>

            <div 
              className={`bg-white rounded-lg p-6 shadow-md border border-[#D3B58D]/20 hover:shadow-lg transition-all duration-700 ${
                featuresInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '500ms' }}
            >
              <span className="text-[#D3B58D] font-bold text-lg">③</span>
              スタイリスト個人が自分の強みをいかせる
              <br />
              <br />
              <span className="text-gray-700 text-sm md:text-base">
 
                <span className="text-[#D3B58D] font-medium">スタイリスト一人一人に専用の材料棚を用意</span>し、
                <br />
                自分が使いたい材料、お客様に合った商品を
                <br />
                自由に選んで注文することができます。
                <br />
                これにより、スタイリストとしての
                <span className="border-b border-[#D3B58D]">創造性と判断力が養われ、</span>
                <br />
                自分らしい成長を実現できる環境です
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* セクション間のセパレーター */}
      <div className="w-full h-16 bg-white"></div>

      {/* 使用商材セクション */}
      <section className="py-16 md:py-24 bg-white">
        <SectionHeader 
          title="使用商材"
          subtitle="Products"
        />
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 gap-3 md:gap-6">
            {/* BYKALTE */}
            <div className="bg-white border border-gray-100 overflow-hidden hover:border-gray-200 transition-all duration-300">
              <div className="relative aspect-[16/9]">
                <Image
                  src="/image/baikarute.jpeg"
                  alt="baikarute製品"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-2 md:p-4">
                <h3 className="text-sm md:text-lg font-bold mb-1 md:mb-2">BYKALTE</h3>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                株式会社ホーユープロフェッショナルが展開するヘアケアブランド。ダメージ補修に特化したトリートメント。
                </p>
              </div>
            </div>

            {/* VILLA */}
            <div className="bg-white border border-gray-100 overflow-hidden hover:border-gray-200 transition-all duration-300">
              <div className="relative aspect-[16/9]">
                <Image
                  src="/image/violla.jpeg"
                  alt="Villa製品"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-2 md:p-4">
                <h3 className="text-sm md:text-lg font-bold mb-1 md:mb-2">Villa Lodola</h3>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                イタリア・ウンブリア州に広がる有機栽培農場。その地で生まれたプロユース専門メーカーKemon社のオーガニックブランド。


                </p>
              </div>
            </div>

            {/* edol */}
            <div className="bg-white border border-gray-100 overflow-hidden hover:border-gray-200 transition-all duration-300">
              <div className="relative aspect-[16/9]">
                <Image
                  src="/image/edol.jpeg"
                  alt="edol製品"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-2 md:p-4">
                <h3 className="text-sm md:text-lg font-bold mb-1 md:mb-2">edol</h3>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                タカラベルモントの理美容室専売ヘアカラーブランド「LebeL」の製品。透明感のあるヘアカラーを実現する次世代型カラー剤。
                </p>
              </div>
            </div>

            {/* 001 */}
            <div className="bg-white border border-gray-100 overflow-hidden hover:border-gray-200 transition-all duration-300">
              <div className="relative aspect-[16/9]">
                <Image
                  src="/image/001.jpeg"
                  alt="001製品"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-2 md:p-4">
                <h3 className="text-sm md:text-lg font-bold mb-1 md:mb-2">エンシャンテッド</h3>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  頭皮と髪のリセットに拘った自社ブランドのシャンプー・トリートメント。
                
                </p>
              </div>
            </div>
          </div>

          {/* 商材に関する追加情報 */}
          <div className="mt-12 bg-white border border-gray-100 p-8">
            <h4 className="text-lg font-bold mb-4">商材へのこだわり</h4>
            <p className="text-gray-600 leading-relaxed">
              amberlでは、お客様一人一人の髪質や好みに合わせて、
              最適な商材を選定しています。スタイリスト各自が
              使用したい商材を選べる環境を整えており、
              より良い施術のために常に新しい商材も積極的に取り入れています。
            </p>
          </div>
        </div>
      </section>

      {/* セクション間のセパレーター */}
      <div className="w-full h-2 bg-white"></div>

      {/* 得られることセクション */}
      <section id="concept" className="py-16 md:py-24 bg-white">
        <SectionHeader 
          title="amberlで働くことで得られる事"
          subtitle="あなたらしい働き方"
        />
        <div className="max-w-6xl mx-auto px-4">
          <div 
            ref={contentRef}
            className="space-y-8"
          >
            <div 
              className={`bg-white p-8 rounded-lg shadow transition-all duration-700 ${
                contentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              <h3 className="text-2xl mb-4 font-bold">
                家族や趣味の時間を作りやすい
              </h3>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="w-full md:w-[400px] flex-shrink-0">
                  <Image
                    src="/image/kazoku.jpg"
                    alt="スタッフの様子"
                    width={400}
                    height={300}
                    className="w-full h-[300px] md:h-[300px] rounded-sm object-cover"
                  />
                </div>
                <p className="text-base md:text-lg leading-relaxed">
                  完全週休2日制で月8〜9日休めるため、家族との時間や自分の時間を大切にできます。
                  また、1日最大5名までの施術で心と体に余裕を持って働けるため、仕事と家庭を無理なく両立できます。
                  長く美容師として活躍できる、持続可能な働き方を実現できます。
                </p>
              </div>
            </div>

            <div 
              className={`bg-white p-8 rounded-lg shadow transition-all duration-700 ${
                contentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
           
              <h3 className="text-2xl mb-4 font-bold">
                ストレスフリーな職場環境
              </h3>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="w-full md:w-[400px] flex-shrink-0">
                  <Image
                    src="/image/sutoresu.jpg"
                    alt="スタッフの様子"
                    width={400}
                    height={300}
                    className="w-full h-[300px] md:h-[300px] rounded-sm object-cover"
                  />
                </div>
                <p className="text-base md:text-lg leading-relaxed">
                  都会の美容室でよくある上下関係や人間関係のストレスから解放されます。
                  無理な残業や後輩の指導を強制されることもなく、
                  自分の仕事に集中できる環境です。
                  帰宅時間が決まっているため、家族との時間や趣味の時間も
                  しっかり確保できます。
                  ストレスフリーな環境で、長く美容師として
                  活躍していただけます。
                </p>
              </div>
            </div>

            <div 
              className={`bg-white p-8 rounded-lg shadow transition-all duration-700 ${
                contentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <h3 className="text-2xl mb-4 font-bold">
                生活の環境に応じて<br />正社員、業務委託のシフトが可能
              </h3>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="w-full md:w-[400px] flex-shrink-0">
                  <Image
                    src="/image/newtokutyou.jpg"
                    alt="スタッフの様子"
                    width={400}
                    height={300}
                    className="w-full h-[300px] md:h-[300px] rounded-sm object-cover"
                  />
                </div>
                <p className="text-base md:text-lg leading-relaxed">
                  現代のワークライフバランスを考え、当店では正社員と業務委託の選択が可能です。
                  最初は不安なので正社員で入社、のちに業務委託の報酬制にすることも可能です。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 現場実績セクション */}
      <section className="py-16 md:py-24 bg-white">
        <SectionHeader 
          title="現場実績"
          subtitle="実際の成果"
        />
        
        {/* 実績説明文 */}
        <div className="max-w-4xl mx-auto px-4 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-left text-gray-700 leading-relaxed text-sm">
              これらの実績は、当サロンで働くスタッフの実際の成果です。<br />
              完全週休2日制という働き方でも、十分な収入を得ることができる環境を整えています。<br />
              あなたも同じような成果を目指してみませんか？
            </p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* 実績① */}
            <div className="text-center group">
              <div className="mb-6">
              </div>
              <div className="flex items-start mb-3">
                <div className="bg-[#9cc812] text-white text-xs font-bold px-2 py-1 mr-3 flex-shrink-0">
                  実績①
                </div>
                <h3 className="text-lg font-bold text-gray-900">入社3ヶ月で売上100万円達成</h3>
              </div>
              <p className="text-sm text-gray-500 mb-4">完全週休2日</p>
              <div className="w-12 h-0.5 bg-[#D3B58D] mx-auto"></div>
            </div>

            {/* 実績② */}
            <div className="text-center group">
              <div className="mb-6">
              </div>
              <div className="flex items-start mb-3">
                <div className="bg-[#9cc812] text-white text-xs font-bold px-2 py-1 mr-3 flex-shrink-0">
                  実績②
                </div>
                <h3 className="text-lg font-bold text-gray-900">スタイリストデビュー半年で<br />指名売上70万円達成</h3>
              </div>
              <p className="text-sm text-gray-500 mb-4">完全週休2日、有給休暇使用</p>
              <div className="w-12 h-0.5 bg-[#D3B58D] mx-auto"></div>
            </div>

            {/* 実績③ */}
            <div className="text-center group">
              <div className="mb-6">
              </div>
              <div className="flex items-start mb-3">
                <div className="bg-[#9cc812] text-white text-xs font-bold px-2 py-1 mr-3 flex-shrink-0">
                  実績③
                </div>
                <h3 className="text-lg font-bold text-gray-900">入社初月で給与支給40万円over</h3>
              </div>
              <p className="text-sm text-gray-500 mb-4">業務委託、月12日休み</p>
              <div className="w-12 h-0.5 bg-[#D3B58D] mx-auto"></div>
            </div>
          </div>
        </div>
      </section>

      {/* セクション間のセパレーター */}
      <div className="w-full h-2 bg-white"></div>

      {/* 現場仕事の日のとある1日セクション - 独立したセクションとして実装 */}
      <section className="py-12 md:py-16 bg-white relative overflow-hidden">
        <div className="relative z-10">
          <SectionHeader 
            title="現場仕事の日のとある1日"
          />
          
          <div className="max-w-4xl mx-auto px-4">
            <div className="space-y-6">
              {[
                { time: "9:30", activity: "出勤、掃除" },
                { time: "10:00", activity: "オープン" },
                { time: "10:00-18:00", activity: "スタイリスト施術業務" },
                { 
                  time: "ランチタイム", 
                  activity: "カラーの放置時間や予約の空き時間を利用して、自由なタイミングで休憩",
                  note: "※施術の合間に柔軟に取得可能"
                }
              ].map((schedule, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-6 group hover:bg-gray-50 p-4 transition-all duration-300"
                >
                  <div className="w-24 flex-shrink-0">
                    <span className="text-[#D3B58D] font-medium text-sm">{schedule.time}</span>
                  </div>
                  <div className="flex-grow">
                    <div className="text-gray-800 text-sm font-medium">{schedule.activity}</div>
                    {schedule.note && (
                      <div className="text-xs text-gray-500 mt-1 italic">{schedule.note}</div>
                    )}
                  </div>
                </div>
              ))}

              <div className="mt-12 bg-gray-50 p-6">
                <h4 className="text-base font-medium text-[#D3B58D] mb-4 pb-2 border-b border-[#D3B58D]/20">
                  1日の流れのポイント
                </h4>
                <div className="space-y-4 text-gray-700 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-1 h-1 bg-[#D3B58D] rounded-full mt-2"></div>
                    <p>
                      <span className="font-medium block mb-1">退勤時間</span>
                      18:00〜19:00の間で、お客様の施術終了次第、簡単な掃除を行い退勤。
                      その後の残業はありません。
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-1 h-1 bg-[#D3B58D] rounded-full mt-2"></div>
                    <p>
                      マンツーマン制で、一日平均3〜5名のお客様を担当。
                      メニューに応じて丁寧な施術時間を確保しています。
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-1 h-1 bg-[#D3B58D] rounded-full mt-2"></div>
                    <p>
                      お客様と親身に向き合い、丁寧な施術ができる環境を整えており、
                      時間に追われることなく、質の高いサービスを提供できます。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* セクション間のセパレーター */}
      <div className="w-full h-2 bg-white"></div>

      {/* スタッフ紹介セクション */}
      <section id="staff" className="py-16 md:py-24 bg-white">
        <SectionHeader 
          title="スタッフ紹介"
          subtitle="働く仲間"
        />
        
        <div className="max-w-5xl mx-auto px-4">
          <div className="space-y-8">
            <StaffCard 
              image="/image/st2.jpeg"
              name="峯 琴奈"
              position="入社2年 / スタイリスト"
              message={`以前は、技術を学ぶ機会が限られていて、なかなか成長を実感できない環境でした。
                  時間に追われる毎日で、お客様一人一人と向き合う余裕もなく...`}
            />
            
            <StaffCard 
              image="/image/terai.jpeg"
              name="寺井 綾希 "
              position="入社1年 / スタイリスト"
              message={`「不安な技術も責任持って指導します！」\nそんなオーナーの一言に心強さを感じ、入社を決意しました。\n\n完全週休二日制に加えて、予約のない日は定時前に帰宅できるため、\n自分の時間に余裕が持てるようになりました。`}
            />
          </div>
        </div>
      </section>

    

      {/* セクション間のセパレーター */}
      <div className="w-full h-2 bg-white"></div>

      <section className="py-16 md:py-24 bg-white relative overflow-hidden" id="requirements" ref={requirementsRef}>
  <div className="relative z-10">
    <SectionHeader 
      title="募集要項"
      subtitle="採用情報"
    />
    <div className="max-w-6xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {[
          {
            title: "勤務地",
            content: "愛知県名古屋市緑区鳴海町母呂後７６"
          },
          {
            title: "雇用形態",
            content: "正社員・業務委託"
          },
          {
            title: "職種・給与",
            content: (
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-[#D3B58D]">正社員</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium mb-2">給与体系</h5>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600">
                        <li>月給23万円～50万円 ※一律支給手当含む</li>
                        <li>基本給：21万円～</li>
                        <li>試用期間：2ヵ月間</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">手当・賞与</h5>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600">
                        <li>通勤手当：5,000円～2万円（通勤距離に応じて）</li>
                        <li>役職手当：1万円～3万円（役職により変動）</li>
                        <li>住宅手当：5,000円～2万円（住宅条件により変動）</li>
                        <li>勤続手当：1,000円～10万円（歩合給に依存）</li>
                        <li>賞与・昇給：あり</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">給与例</h5>
                      <p className="text-gray-600">基本給210,000円＋固定残業手当20,000円（18時間未満/月）※残業時間を超過する場合は別途支給<br />
                      ＋歩合給（売上の5〜10%）＋店販手当10%</p>
                      <p className="text-gray-600 mt-2">例）技術売上900,000円、店販売上100,000円の場合<br />
                      総支給300,000円（基本給210,000円＋固定残業手当20,000円＋歩合給45,000円＋店販手当10,000円）</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-4 text-[#D3B58D]">業務委託</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium mb-2">基本情報</h5>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600">
                        <li>完全歩合制</li>
                        <li>保障給：月額30万円（入社後6ヶ月間）</li>
                        <li>試用期間：2ヵ月間</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">歩合内容</h5>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600">
                        <li>技術売上（フリー・指名共通）（税抜）
                          <ul className="list-none mt-2 space-y-1">
                            <li>～600,000円 → 50％</li>
                            <li>600,001～1,000,000円 → 55％</li>
                            <li>1,000,001～1,500,000円 → 60％</li>
                            <li>1,500,001円～ → 65％</li>
                          </ul>
                        </li>
                        <li>店販売上：10%</li>
                        <li>指名料売上：100%（料金は要相談）</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">給与例</h5>
                      <p className="text-gray-600">例）技術売上1,000,000円、店販売上100,000円の場合<br />
                      総支給560,000円（歩合給550,000円＋店販手当10,000円）</p>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">費用負担</h5>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600">
                        <li>ブース代：330円×入客数/月</li>
                        <li>消耗品材料費：技術売上の5～10%程度</li>
                        <li>タオル代：技術売上×0.5%/月</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )
          },
          {
            title: "勤務時間",
            content: (
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium mb-2">正社員</h5>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>09:30 - 19:00（所定勤務7-8時間／固定時間制）</li>
                    <li>週5勤務</li>
                    <li>18時以降予約がなければ帰宅可</li>
                    <li>残業なし</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">業務委託</h5>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>週5勤務（時短、週4勤務も相談可）</li>
                    <li>勤務時間は応相談</li>
                  </ul>
                </div>
              </div>
            )
          },
          {
            title: "休日・休暇",
            content: (
              <div className="space-y-4">
                <p className="font-medium">年間休日数：110日</p>
                <div>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>完全週休2日制</li>
                    <li>土日休みOK</li>
                    <li>日曜休みOK</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">休暇制度</h5>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>年末年始休暇（12/31、1/1.2.3.4）</li>
                    <li>夏季休暇（2日間 ※年間どこでも使用可、1日ずつの使用可）</li>
                    <li>冬季休暇（12/31、1/1.2.3.4）</li>
                    <li>産前・産後休暇（法律に則って）</li>
                    <li>育児休暇（法律に則って）</li>
                    <li>年間有給休暇：10日</li>
                  </ul>
                </div>
              </div>
            )
          },
          {
            title: "福利厚生",
            content: (
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium mb-2">社会保険・手当 ※社員のみ</h5>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>社会保険完備</li>
                    <li>通勤手当支給</li>
                    <li>住宅手当支給</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">その他制度</h5>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>研修、セミナー参加の費用補助（内容に合わせて）</li>
                    <li>社員割引（商品、技術割引あり）</li>
                    <li>スタイルアップ・ブログ等のAI自動更新ツール使用可</li>
                  </ul>
                </div>
              </div>
            )
          }
        ].map((item, index) => (
          <div 
            key={index}
            className={`flex flex-col md:flex-row border-b border-gray-100 ${
              index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
            }`}
          >
                  <div className="w-full md:w-1/4 p-4 md:p-6">
              <h4 className="font-bold text-gray-800">{item.title}</h4>
            </div>
            <div className="w-full md:w-3/4 p-4 md:p-6">
              {typeof item.content === 'string' ? (
                <p className="text-gray-600">{item.content}</p>
              ) : (
                item.content
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

      <RequirementSection />

      {/* セクション間のセパレーター */}
      <div className="w-full h-2 bg-white"></div>
  
      <section className="py-16 md:py-24 bg-white relative overflow-hidden" id="qa" ref={qaRef}>
  <div className="relative z-10">
    <SectionHeader 
      title="よくあるご質問"
      subtitle="Q&A"
    />
    <div className="max-w-6xl mx-auto px-4">
      <div className="space-y-4">
        {[
          {
            question: "働いているスタッフさんは、サロン選びで重視したポイントは何ですか？",
            answer: "私たちのサロンを選んでくれたスタッフの多くが、「ゆとりのある施術時間」と「家庭との両立のしやすさ」を重視していました。1日最大5名までの施術で、お客様一人一人と向き合える環境を整えています。また、完全週休2日制で、産休・育休の取得率100%など、ライフスタイルに合わせた働き方ができることも魅力の一つだと思います。"
          },
          {
            question: "実際に働いてみて、どのような経験が得られますか？",
            answer: "マンツーマンということもありお客様との関わり方、丁寧な接客やお気遣いの大切さなどを学ぶことができます。また、スタイリスト一人一人に専用の材料棚を用意しているため、自分の判断で材料を選び、創造性を発揮できる環境です。お客様との信頼関係を築きながら、技術だけでなく人間性も成長できる場所です。"
          },
          {
            question: "職場の雰囲気や人間関係を教えてください",
            answer: "上下関係による人間関係のトラブルを最小限に抑えることを心がけています。スタッフ同士も仲が良く、分からないことも親切に教えてもらえる環境です。子育て中のスタッフも多く、育児をしながらの仕事にも理解があるあたたかいサロンです。お客様も長くご来店いただいている方が多く、スタッフとの関係も良好です。"
          }
        ].map((qa, index) => (
          <details 
            key={index} 
            className={`bg-white p-6 rounded-lg shadow-sm group transition-all duration-500 ease-out hover:shadow-md ${
              qaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <summary className="text-lg md:text-xl font-medium cursor-pointer list-none flex justify-between items-center text-gray-800">
              <span className="flex items-center gap-3">
                <span className="text-[#D3B58D] font-bold">Q.</span>
                {qa.question}
              </span>
              <span className="transform group-open:rotate-180 transition-transform duration-300 text-[#D3B58D]">
                ▼
              </span>
            </summary>
            <div className="mt-6 pl-8 text-gray-600 leading-relaxed">
              <div className="flex">
                <span className="text-[#D3B58D] font-bold text-lg mr-3">A.</span>
                <p className="text-gray-700">{qa.answer}</p>
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* セクション間のセパレーター */}
      <div className="w-full h-2 bg-white"></div>

      <section id="owner-message" className="py-12 md:py-24 bg-white">
        <div className="relative z-10">
        <SectionHeader 
          title="オーナー挨拶"
          subtitle="Message from Owner"
        />
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-white p-4 md:p-12 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
              <div className="md:w-1/3 flex flex-col items-center text-center">
                <div className="w-32 h-32 md:w-64 md:h-64 overflow-hidden rounded-full border-4 border-white shadow-md mb-6">
                  <Image
                    src="/image/itou1.png"
                    alt="オーナーの写真"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover object-top"
                    priority
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">オーナー</h3>
                <p className="text-gray-600 mb-8 md:mb-0">伊藤</p>
              </div>
              
              <div className="md:w-2/3">
                <div className="prose prose-sm md:prose-lg max-w-none">
                  <p className="space-y-6 md:space-y-8">
                    <span className="block mb-6 md:mb-8 text-gray-800 text-base md:text-lg leading-relaxed">
                      はじめまして。amberlオーナーの伊藤圭吾です。
                      僕は美容師という仕事にとても誇りを持っています。周りの美容師仲間も皆、それぞれ芯を持って働いています。
                      そして自分の大切なことはなにか。そこに重点を置いています。
                    </span>

                    <span className="block mb-6 md:mb-8 text-gray-800 text-base md:text-lg leading-relaxed">
                      僕自身、美容師はとても好きですが他にも家族との時間や趣味の時間、人との付き合いの時間もとても大切にしています。
                      全てのバランスが整っている時、その人のポテンシャルが発揮されると思っています。
                      自分の心や身体が充実している状態こそが人を幸せに出来る状態であると思います。amberlで働くスタッフには出来るだけそのような状態でいてほしいです。
                    </span>

                    <span className="block mb-6 md:mb-8 text-gray-800 text-base md:text-lg leading-relaxed">
                      僕たちはお客様を笑顔に、幸せにしてあげられる職業です。
                      日々あわただしく過ぎていく日常ではなく、心に余裕とゆとりを持ち、お客様や周りの人に幸せを分けてあげられるような働き方をしていただきたいです。
                    </span>

                    <span className="block text-gray-800 text-base md:text-lg leading-relaxed">
                      そんな環境を作るのも僕の仕事です。時代に合わせて現代を働く美容師さんたちの充実したワークライフバランスを作ることが僕自身の目標でもあります。
                      ご応募後、是非一度お話を聞きにいらしてください。
                    </span>
                  </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#333] text-white py-8 md:py-16 px-4 relative"> {/* relative を追加 */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 pb-20"> {/* pb-20 を追加してボタンのスペースを確保 */}
            <div>
              <h3 className="text-xl mb-4 flex items-center">
                <i className="fab fa-instagram text-2xl mr-2"></i>
                Instagram
              </h3>
              <div className="flex flex-col space-y-4">
                <div className="flex space-x-4">
                  <a 
                    href="https://www.instagram.com/amberl202467" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-2xl hover:text-[#4a90e2]"
                  >
                    <i className="fab fa-instagram"></i>
                    <span className="text-sm ml-2">サロン公式</span>
                  </a>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl mb-4">店舗情報</h3>
              <p>住所：〒458-0844 愛知県名古屋市緑区鳴海町母呂後７６</p>
              <p>電話：052-693-6609</p>
              <p>営業時間：10:00-19:00（カット最終受付18:00）</p>
              <p>定休日：毎週月曜日</p>
              <div className="mt-4 w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6530.672073295563!2d136.9469809!3d35.0733357!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60037dbbd88f363d%3A0xa666fcf643dec8e7!2samberl%E3%80%90%E3%82%A2%E3%83%B3%E3%83%90%E3%83%BC%E3%83%AB%E3%80%91!5e0!3m2!1sja!2sjp!4v1743482289459!5m2!1sja!2sjp"
                  className="w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="amberlの所在地"
                  aria-label="amberlの所在地を示すGoogleマップ"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* 追従するCTAボタン - フッター内の最後に配置 */}
        <a 
          href="https://lin.ee/3u7E6NY"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-0 left-0 right-0 z-40 bg-[#06c755] text-white py-4 shadow-lg hover:bg-[#059144] transition-all duration-300 flex items-center justify-center space-x-2 w-full"
        >
          <span className="text-base font-medium">応募する</span>
        </a>
      </footer>

      

      
    </div>
  );
}
// スタイリングの追加
const styles = {
  sectionTitle: `
    relative
    inline-block
    text-2xl md:text-3xl lg:text-4xl
    font-bold
    text-center
    pb-2
    after:content-['']
    after:absolute
    after:bottom-0
    after:left-1/2
    after:transform
    after:-translate-x-1/2
    after:w-12
    after:h-1
    after:bg-rose-400
  `,
};

MainComponent.propTypes = {
  // 必要に応じてpropTypesを定義
};

export default function Home() {
  return <MainComponent />;
}

