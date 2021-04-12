--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

-- Started on 2021-04-11 16:55:38 IST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 200 (class 1259 OID 16386)
-- Name: products; Type: TABLE; Schema: public; Owner: durgeshkumar
--

CREATE TABLE public.products (
    product_code uuid NOT NULL,
    product_value integer NOT NULL
);


ALTER TABLE public.products OWNER TO durgeshkumar;

--
-- TOC entry 201 (class 1259 OID 16391)
-- Name: products_queues; Type: TABLE; Schema: public; Owner: durgeshkumar
--

CREATE TABLE public.products_queues (
    product_value integer NOT NULL,
    id uuid NOT NULL
);


ALTER TABLE public.products_queues OWNER TO durgeshkumar;

--
-- TOC entry 202 (class 1259 OID 16394)
-- Name: products_regions; Type: TABLE; Schema: public; Owner: durgeshkumar
--

CREATE TABLE public.products_regions (
    zone character(64) NOT NULL,
    id uuid NOT NULL
);


ALTER TABLE public.products_regions OWNER TO durgeshkumar;

--
-- TOC entry 203 (class 1259 OID 16397)
-- Name: users; Type: TABLE; Schema: public; Owner: durgeshkumar
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    email text NOT NULL,
    hash text NOT NULL
);


ALTER TABLE public.users OWNER TO durgeshkumar;

--
-- TOC entry 3267 (class 0 OID 16386)
-- Dependencies: 200
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: durgeshkumar
--

COPY public.products (product_code, product_value) FROM stdin;
c45c5703-9c09-49f5-b007-b971c1643693	223
e5e35c2a-528e-43d6-9a7e-fbfef3b69a90	10
364f68e8-bf8e-460e-92fd-4b041c5dfc44	10
2bfdec76-e1cc-456b-8b30-d1a4541152eb	20
\.


--
-- TOC entry 3268 (class 0 OID 16391)
-- Dependencies: 201
-- Data for Name: products_queues; Type: TABLE DATA; Schema: public; Owner: durgeshkumar
--

COPY public.products_queues (product_value, id) FROM stdin;
\.


--
-- TOC entry 3269 (class 0 OID 16394)
-- Dependencies: 202
-- Data for Name: products_regions; Type: TABLE DATA; Schema: public; Owner: durgeshkumar
--

COPY public.products_regions (zone, id) FROM stdin;
\.


--
-- TOC entry 3270 (class 0 OID 16397)
-- Dependencies: 203
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: durgeshkumar
--

COPY public.users (id, email, hash) FROM stdin;
c683d031-a04f-4b14-8235-357fed29449d	kumardurgeshpatel@gmail.com	$2b$10$nVfbA5aVm0Sfqf7TOFgAEu1P9112gE/zysm3dR2plEz.ZsLf/mS1m
\.


--
-- TOC entry 3130 (class 2606 OID 16390)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: durgeshkumar
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (product_code);


--
-- TOC entry 3132 (class 2606 OID 16435)
-- Name: products_queues products_queues_pkey; Type: CONSTRAINT; Schema: public; Owner: durgeshkumar
--

ALTER TABLE ONLY public.products_queues
    ADD CONSTRAINT products_queues_pkey PRIMARY KEY (id);


--
-- TOC entry 3134 (class 2606 OID 16433)
-- Name: products_regions products_regions_pkey; Type: CONSTRAINT; Schema: public; Owner: durgeshkumar
--

ALTER TABLE ONLY public.products_regions
    ADD CONSTRAINT products_regions_pkey PRIMARY KEY (id);


--
-- TOC entry 3136 (class 2606 OID 16404)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: durgeshkumar
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


-- Completed on 2021-04-11 16:55:38 IST

--
-- PostgreSQL database dump complete
--

