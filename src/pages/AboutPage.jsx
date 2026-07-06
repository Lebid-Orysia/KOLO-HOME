import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';

export default function AboutPage() {
  const [aboutData, setAboutData] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const origin = window.location.origin;
    const baseUrl = import.meta.env.BASE_URL || '/';
    const cleanBase = baseUrl.startsWith('/') ? baseUrl : `/${baseUrl}`;
    const targetUrl = `${origin}${cleanBase}mocks/about.json`.replace(/([^:]\/)\/+/g, "$1");

    fetch(targetUrl)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load about data');
        return res.json();
      })
      .then((data) => {
        setAboutData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching about page data:", err);
        setIsLoading(false);
      });
  }, []);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (isLoading) {
    return <div className="product-loading">Loading...</div>;
  }

  if (!aboutData) {
    return <div className="product-error"><h2>Failed to load page content 😢</h2></div>;
  }

  return (
    <>
      <section id="about" className="about">
        <div className="container">
          <div className="about__header">
            <h2 className="about__title">{aboutData.title}</h2>
            <p className="about__description">{aboutData.description}</p>
          </div>

          <div className="about__accordion">
            {aboutData.accordion.map((item, index) => (
              <div
                key={item.id}
                className={`about__item ${activeIndex === index ? 'about__item--active' : ''}`}>
                <button className="about__trigger" onClick={() => toggleAccordion(index)}>
                  <span className="about__subtitle">{item.subtitle}</span>
                  <span className="about__icon"></span>
                </button>

                <div className="about__content">
                  <div className="about__inner">

                    {(item.type === 'text' || item.type === 'text_with_note') && (
                      <p>
                        <span dangerouslySetInnerHTML={{ __html: item.text }} />
                        {item.note && (
                          <>
                            <span className="about__note" dangerouslySetInnerHTML={{ __html: item.note }} />
                          </>
                        )}
                      </p>
                    )}

                    {item.type === 'list' && (
                      <ul>
                        {item.items.map((bullet, idx) => (
                          <li key={idx} dangerouslySetInnerHTML={{ __html: bullet }} />
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Фонове відео */}
        <div className="about__video-wrapper">
          <video
            src={`${import.meta.env.BASE_URL}about-video.mp4`}
            autoPlay
            muted
            loop
            playsInline
            className="about__video"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
      <Footer />
    </>
  );
}