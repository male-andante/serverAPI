import React, { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import "./styles.css";
import "dotenv/config"

const BlogAuthor = ({ authorId }) => {
  const [author, setAuthor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAuthor = async () => {
      if (!authorId) return;
      
      try {
        setIsLoading(true);
        let response = await fetch(process.env.baseUrl + '/authors/' + authorId);
        
        if (response.ok) {
          let data = await response.json();
          console.log('Autore ricevuto:', data);
          setAuthor(data);
          setError(null);
        } else {
          const data = await response.json();
          console.error('Errore dalla API:', data);
          setError('Errore nel caricamento dell\'autore');
        }
      } catch (error) {
        console.error('Errore nella fetch:', error);
        setError('Errore nel caricamento dell\'autore: ' + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getAuthor();
  }, [authorId]);

  if (!authorId) return null;
  if (isLoading) return <div>Caricamento autore...</div>;
  if (error) return <div>{error}</div>;
  if (!author) return null;

  return (
    <Row>
      <Col xs={"auto"} className="pe-0">
        <Image className="blog-author" src={author.avatar} roundedCircle />
      </Col>
      <Col>
        <div>di</div>
        <h6>{author.name}</h6>
      </Col>
    </Row>
  );
};

export default BlogAuthor;
