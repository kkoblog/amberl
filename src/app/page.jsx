"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

// セクションヘッダーのコンポーネント化
const SectionHeader = ({ title, subtitle }) => (
  <div className="relative mb-8 md:mb-12 px-4">
    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-black">
      <span className="relative inline-block pb-4">
        {title}
        <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#D3B58D]"></span>
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
    bg: 'bg-[#f8f6f4]',      // ベースの明るいベージュ
    text: 'text-[#4a4a4a]',  // ダークグレー
    accent: 'bg-[#d4c3b7]',  // ライトブラウン
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
const StaffCard = ({ image, name, position, message, instagramUrl }) => {
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
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-bold text-lg">{name}</p>
            <p className="text-sm text-gray-600">{position}</p>
          </div>
        </div>
        
        <div className="space-y-4 mb-6">
          <p className="text-gray-700">
            {message}
          </p>
          
          <p className="text-gray-700">
            でも<span className="font-bold text-[#D3B58D]">michillでは</span>、
            <span className="bg-[#D3B58D]/10 px-2 py-1 rounded inline-block mt-1">
              スタッフが快く対応してくれ、お客様への連絡も代わりにしてくれます。
            </span>
          </p>
          
          <p className="text-gray-700">
            お客様も子育て経験者が多く理解があるので、
            <span className="border-b-2 border-[#D3B58D]">
              ママでも安心して美容師を続けられています！
            </span>
          </p>
        </div>
        
        <InstagramEmbed url={instagramUrl} />
      </div>
    </div>
  );
};

// スライドショーコンポーネントを追加
const ImageSlideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    {
      src: "/image/gaikan.jpg",
      alt: "外観の様子"
    },
    {
      src: "/image/naikan.jpg",
      alt: "店内の様子"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full aspect-[1/1] sm:aspect-[16/10] md:aspect-[16/9] lg:aspect-[1/1] overflow-hidden rounded-lg shadow-lg">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-all duration-1000 ${
            currentImageIndex === index 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 translate-x-full'
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 640px) 100vw,
                   (max-width: 768px) 80vw,
                   (max-width: 1024px) 70vw,
                   60vw"
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
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentImageIndex === index ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

function MainComponent() {
  const [showScrollTop, setShowScrollTop] = useState(false);

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

  // スクロール位置を監視して、ボタンの表示/非表示を制御
  useEffect(() => {
    const handleScroll = () => {
      // 100px以上スクロールしたらボタンを表示
      setShowScrollTop(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // トップへスクロール
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

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
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#D3B58D]/10 to-[#D3B58D]/5">
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

          

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-12">
            <Link 
              href="/contact" 
              className="bg-[#e24a4a] text-white px-6 py-3 rounded-full hover:bg-[#bd3535] transition duration-300 text-sm sm:text-base sm:px-8 w-fit mx-auto sm:mx-0"
            >
              応募する
            </Link>
          
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

  return (
    <div className="font-noto-sans relative">
      <header className="bg-[#fafafa] py-8 md:py-16 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">
          
          
          <div className="relative">
            <Image
              src="/image/michill.jpg"
              alt="明るく清潔感のあるサロン内装"
              width={1200}
              height={600}
              className="w-full h-[350px] md:h-[500px] object-cover rounded-lg shadow-lg"
            />
            
            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
              <div className="text-white px-4 md:px-8 text-center space-y-8">
                <p className="text-base md:text-2xl font-medium mb-6 opacity-0 animate-[fadeInUp_1s_ease-out_0.5s_forwards]">
                  ー<br />
                  ー<br />
                  ー
                </p>
                
                <p className="text-base md:text-xl leading-relaxed max-w-2xl mx-auto mb-6 opacity-0 animate-[fadeInUp_1s_ease-out_1.5s_forwards]">
                  ー<br />
                  
                </p>
                
                <div className="relative">
                  <p className="text-2xl md:text-4xl lg:text-5xl font-medium opacity-0 blur-sm" id="blurText">
                    <span className="inline-block">amberl</span>
                  </p>
                  <style jsx>{`
                    #blurText {
                      animation: blurReveal 2s ease-out 2s forwards;
                    }
                    
                    @keyframes blurReveal {
                      0% {
                        opacity: 0;
                        filter: blur(10px);
                      }
                      100% {
                        opacity: 1;
                        filter: blur(0);
                      }
                    }
                  `}</style>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </header>

      

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-8">
        <Link 
          href="/contact" 
          className="bg-[#e24a4a] text-white px-6 py-3 rounded-full hover:bg-[#bd3535] transition duration-300 text-sm sm:text-base sm:px-8 w-fit mx-auto sm:mx-0"
        >
          応募する
        </Link>
        <button className="bg-[#06c755] text-white px-6 py-3 rounded-full hover:bg-[#059144] transition duration-300 text-sm sm:text-base sm:px-8 w-fit mx-auto sm:mx-0">
          代表伊藤からのメッセージを見る
        </button>
      </div>

      <div className="mt-8 md:mt-12 px-4 max-w-6xl mx-auto">
        <Image
          src="/image/zentai.png"
          alt="説明的な代替テキスト"
          width={1200}
          height={800}
          className="w-full h-auto rounded-lg shadow-lg"
          priority
        />
      </div>

      <section className="py-16 md:py-24 mt-8 md:mt-12">
        <SectionHeader 
          title="世の中の女性美容師さんが抱える悩み事、当サロンでは一切致しません"
          subtitle="現場で女性美容師さんを困らせること"
        />
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 gap-2 md:gap-8">
            {/* 左側: 一般的な美容室の悩み */}
            <div className="p-2 md:p-6 rounded-lg">
              <h3 className="text-base md:text-xl font-bold text-center mb-3 md:mb-6 text-red-600">＜他店での悩み＞</h3>
              <div className="flex flex-col items-center gap-2 md:gap-4">
                {[
                  "「スタイリストになったのに...」\n先輩の手伝いばかりで、自分の入客の時間がもらえない💦",
                  "「結婚後の生活が不安...」\n朝から夜遅くまで働き、勤務終了後は後輩の面倒を見ないといけない💦",
                  "「技術を磨きたいのに...」\nシャンプー、ブロー、掃除に追われる毎日💦",
                  "「こんなはずじゃなかった...」\n早く帰るスタッフは冷たい目で見られ、残業が当たり前の雰囲気💦",
                
                ].map((concern, index) => (
                  <React.Fragment key={index}>
                    <div 
                      className={`border-2 border-red-200 rounded-lg p-2 md:p-4 w-full text-center bg-white shadow-sm transition-all duration-500 text-xs md:text-base leading-relaxed whitespace-pre-line`}
                    >
                      {concern}
                    </div>
                    {index < 4 && (
                      <div className="text-red-400 text-base md:text-2xl">
                        ↓
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* 右側: amberlの場合 */}
            <div className="p-2 md:p-6 rounded-lg">
              <h3 className="text-base md:text-xl font-bold text-center mb-3 md:mb-6 text-[#D3B58D]">＜amberlの場合＞</h3>
              <div className="flex flex-col items-center gap-2 md:gap-4">
                {[
                  "あなたのワークバランスを考えた働き方を提案・提供\n ",
                  "マンツーマンでゆとりある働き方\n1日最大5名まで✨",
                  "家族・プライベートの時間がつくれる\n完全週休2日制（毎週月曜＋希望日、土日休み可）✨",
                  "ストレスフリーな生涯現役美容師ライフ\n社保完備、産休・育休取得率100%、時短勤務OK✨",
                  "スタイリスト見習いでも安心の環境\n入社1年目でも月収25-30万円、入社初月70〜80名入客実績あり✨"
                ].map((solution, index) => (
                  <React.Fragment key={index}>
                    <div 
                      className={`border-2 border-[#D3B58D] rounded-lg p-2 md:p-4 w-full text-center bg-white shadow-sm transition-all duration-500 text-xs md:text-base leading-relaxed`}
                    >
                      {solution}
                    </div>
                    
                    {index < 4 && (
                      <div className="text-[#D3B58D] text-base md:text-2xl">
                        ↓
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-4 bg-gradient-to-r from-[#D3B58D]/10 to-[#D3B58D]/5 rounded-3xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/50"></div>
        
        <div className="relative z-10">
          <h3 className="text-xl md:text-3xl font-bold text-center mb-6">
            <span className="text-[#D3B58D]">amberlの特徴</span>
            <br className="md:hidden" />
          </h3>

         
<div className="mt-8 md:mt-12 px-4 max-w-6xl mx-auto">
  <div 
    className={`max-w-lg mx-auto transition-all duration-1000 ${
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
              ゆとりある働き方
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
               
                <br />
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

      <section className="py-16 md:py-24 bg-gradient-to-r from-[#D3B58D]/10 to-[#D3B58D]/5">
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
                    src="/image/zikannai.JPG"
                    alt="スタッフの様子"
                    width={400}
                    height={300}
                    className="w-full h-[400px] md:h-[300px] rounded-lg object-cover"
                  />
                </div>
                <p className="text-base md:text-lg leading-relaxed">
                  これにより、体と心に負担がかからず、家庭とお仕事の両立ができます。
                  女性にゆとりができると家族の雰囲気もガラッと変わりますね。
                  10年後、お子さまやパートナーからもリスペクトされる働き方を作りましょう。
          
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
                上下関係がなく人トラブルを最小限に
              </h3>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="w-full md:w-[400px] flex-shrink-0">
                  <Image
                    src="/image/miga.jpg"
                    alt="スタッフの様子"
                    width={400}
                    height={300}
                    className="w-full h-[400px] md:h-[300px] rounded-lg object-cover"
                  />
                </div>
                <p className="text-base md:text-lg leading-relaxed">
                  これにより、急な体調のゆらぎが起こった場合はしばらくは在宅に切り替えたり、
                  現場以外のメーカー部や企画広報部としてのお仕事で地域貢献もできます、
                  弊社ではコンセプトの異なる4サロンを展開しているため、
                  年齢や希望に沿った働き方を一緒に作っていきましょう。

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
                生活の環境に応じて正社員、業務委託のシフトが可能
              </h3>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="w-full md:w-[400px] flex-shrink-0">
                  <Image
                    src="/image/sezyutu.jpg"
                    alt="スタッフの様子"
                    width={400}
                    height={300}
                    className="w-full h-[400px] md:h-[300px] rounded-lg object-cover"
                  />
                </div>
                <p className="text-base md:text-lg leading-relaxed">
                  「白髪老化ケア」という頭皮や髪を錆びさせずに、
                  守り続ける施術を自社開発しました。
                  これにより、お客様が失客せず、末永く施術することが可能になりました。
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <div 
              className={`bg-white p-8 rounded-lg shadow transition-all duration-700 ${
                contentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <h3 className="text-2xl mb-6 font-bold text-center">
                <span className="relative inline-block">
                  現場仕事の日のとある1日
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#D3B58D]/30"></span>
                </span>
              </h3>
              
              <div className="max-w-2xl mx-auto">
                <div className="space-y-4">
                  {[
                    { time: "9:30", activity: "出勤、掃除" },
                    { time: "10:00", activity: "オープン" },
                    { time: "10:00-18:00", activity: "スタイリスト施術業務" }
                  ].map((schedule, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-6 p-4 hover:bg-[#D3B58D]/5 rounded-lg transition-colors duration-300"
                    >
                      <div className="w-24 flex-shrink-0">
                        <span className="font-bold text-[#D3B58D]">{schedule.time}</span>
                      </div>
                      <div className="flex-grow">
                        <span className="text-gray-700">{schedule.activity}</span>
                      </div>
                    </div>
                  ))}

                  <div className="mt-8 p-6 bg-[#D3B58D]/5 rounded-lg">
                    
                    <div className="space-y-4 text-gray-700">

                    <p>
                        <span className="font-medium">✤ 退勤時間</span><br />
                        18:00〜19:00の間で、お客様の施術終了次第、簡単な掃除を行い退勤。
                        その後の残業はありません。
                      </p>

                      <p>
                        
                        マンツーマン制で、一日平均3〜5名のお客様を担当。
                        メニューに応じて丁寧な施術時間を確保しています。
                      </p>
                      
                      <p>
                        
                        お客様と親身に向き合い、丁寧な施術ができる環境を整えております。
                        時間に追われることなく、質の高いサービスを提供できます。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-12">
            <Link 
              href="/contact" 
              className="bg-[#e24a4a] text-white px-6 py-3 rounded-full hover:bg-[#bd3535] transition duration-300 text-sm sm:text-base sm:px-8 w-fit mx-auto sm:mx-0"
            >
              応募する
            </Link>
            
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        
        <div className="max-w-5xl mx-auto px-4">
          <div className="space-y-8">
            <StaffCard 
              image="/image/aoi.jpg"
              name="あおい"
              position="入社4年目 / スタイリスト"
              message={`4歳の子供がいるため、急な休みを取ることも...`}
              instagramUrl="https://www.instagram.com/reel/C_7jiphvJ4I/embed"
            />
            {/* 必要に応じて追加のStaffCardを配置 */}
          </div>
        </div>
      </section>

    

<section className="py-16 md:py-24 bg-gradient-to-r from-[#D3B58D]/10 to-[#D3B58D]/5">
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
          content: "正社員"
        },
        {
          title: "職種・給与",
          content: (
            <div className="space-y-6">
              <div>
                <p className="font-medium mb-3">給与体系</p>
                <ul className="list-disc list-inside ml-4 text-gray-600 space-y-2">
                  <li>月給23万円～50万円 ※一律支給手当含む</li>
                  <li>基本給：21万円～40万円</li>
                  <li>試用期間：2ヵ月間</li>
                </ul>
              </div>
              
              <div>
                <p className="font-medium mb-3">手当・賞与</p>
                <ul className="list-disc list-inside ml-4 text-gray-600 space-y-2">
                  <li>通勤手当：5,000円～2万円（通勤距離に応じて）</li>
                  <li>役職手当：1万円～3万円（役職により変動）</li>
                  <li>住宅手当：5,000円～2万円（住宅条件により変動）</li>
                  <li>勤続手当：1,000円～10万円（歩合給に依存）</li>
                  <li>賞与・昇給：あり</li>
                </ul>
              </div>

              <div>
                <p className="font-medium mb-3">給与例</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    基本給210,000円＋固定残業手当20,000円（15時間未満/月）※残業時間を超過する場合は別途支給<br />
                    ＋歩合給（売上の5〜10%）＋店販手当10%<br />
                    <span className="mt-2 block font-medium">例）技術売上900,000円、店販売上100,000円の場合</span>
                    総支給300,000円（基本給210,000円＋固定残業手当20,000円＋歩合給45,000円＋店販手当10,000円＋通勤手当10,000円）
                  </p>
                </div>
              </div>
            </div>
          )
        },
        {
          title: "勤務時間",
          content: (
            <div className="space-y-4">
              <p>09:30 - 19:00（所定勤務7-8時間／固定時間制）</p>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>週5勤務</li>
                <li>18時以降予約がなければ帰宅可</li>
                <li>残業なし</li>
              </ul>
            </div>
          )
        },
        {
          title: "休日・休暇",
          content: (
            <div className="space-y-4">
              <div>
                <p className="font-medium mb-2">年間休日数：110日</p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>完全週休2日制</li>
                  <li>土日休みOK</li>
                  <li>日曜休みOK</li>
                </ul>
              </div>
              <div>
                <p className="font-medium mb-2">休暇制度</p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium mb-2">社会保険・手当</p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>社会保険完備</li>
                  <li>通勤手当支給</li>
                  <li>住宅手当支給</li>
                </ul>
              </div>
              <div>
                <p className="font-medium mb-2">その他制度</p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>研修、セミナー参加の費用補助（内容に合わせて）</li>
                  <li>社員旅行（希望者のみ全額会社負担）</li>
                  <li>社員割引（商品、技術割引あり）</li>
                </ul>
              </div>
            </div>
          )
        },
        
      ].map((item, index) => (
        <div 
          key={index}
          className={`flex flex-col md:flex-row border-b border-gray-100 ${
            index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
          }`}
        >
          <div className="w-full md:w-1/4 p-4 md:p-6 bg-[#D3B58D]/5">
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
</section>



      <RequirementSection />

      <section className="py-16 md:py-24" id="qa" ref={qaRef}>
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
                answer: "マンツーマンということもありお客様との関わり方、丁寧な接客やお気遣いの大切さなどを学ぶことができます。"
              },
              {
                question: "職場の雰囲気や人間関係を教えてください",
                answer: "上下関係による人間関係のトラブルを最小限に抑えることを心がけています。スタッフ一人一人が自分の強みを活かせるよう、専用の材料棚を用意するなど、個性を重視した環境づくりを行っています。"
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
                    <span className="text-[#D3B58D]">Q.</span>
                    {qa.question}
                  </span>
                  <span className="transform group-open:rotate-180 transition-transform duration-300 text-[#D3B58D]">
                    ▼
                  </span>
                </summary>
                <div className="mt-4 pl-6 text-gray-600 leading-relaxed">
                  <span className="text-[#D3B58D] font-medium">A.</span>
                  <span className="ml-2">{qa.answer}</span>
                </div>
              </details>
            ))}
          </div>
          
          
        </div>
      </section>

      <section className="py-12 md:py-24 bg-gradient-to-r from-[#D3B58D]/10 to-[#D3B58D]/5">
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
                    src="/image/roni.jpg"
                    alt="オーナーの写真"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
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
      </section>

      <footer className="bg-[#333] text-white py-8 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div>
              <h3 className="text-xl mb-4 flex items-center">
                <i className="fab fa-instagram text-2xl mr-2"></i>
                Instagram
              </h3>
              <div className="flex flex-col space-y-4">
                <div className="flex space-x-4">
                  <a 
                    href="https://www.instagram.com/michill_hair/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-2xl hover:text-[#4a90e2]"
                  >
                    <i className="fab fa-instagram"></i>
                    <span className="text-sm ml-2">サロン公式</span>
                  </a>
                  <a 
                    href="https://www.instagram.com/rony_19795/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-2xl hover:text-[#4a90e2]"
                  >
                    <i className="fab fa-instagram"></i>
                    <span className="text-sm ml-2">代表伊藤</span>
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3266.8876595456584!2d136.96893797670753!3d35.0511872726205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60037a5df3259c45%3A0x3c160ce253aeea76!2z44CSNDU4LTA4NDQg5oSb55-l55yM5ZCN5Y-k5bGL5biC57eR5Yy65aWJ5rW35biC5rWB5ZCJ5b6M77yX77yW!5e0!3m2!1sja!2sjp!4v1711604961037!5m2!1sja!2sjp"
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
      </footer>

      {/* トップへ戻るボタン */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-4 right-4 z-40 bg-gray-700 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-600 transition-all duration-300 ${
          showScrollTop ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        aria-label="トップへ戻る"
      >
        <svg 
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
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

