PGDMP         6                y            products_db    13.2    13.2     ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    16384    products_db    DATABASE     V   CREATE DATABASE products_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C';
    DROP DATABASE products_db;
                durgeshkumar    false            ?            1259    16386    products    TABLE     e   CREATE TABLE public.products (
    product_code uuid NOT NULL,
    product_value integer NOT NULL
);
    DROP TABLE public.products;
       public         heap    durgeshkumar    false            ?            1259    16391    products_queues    TABLE     b   CREATE TABLE public.products_queues (
    product_value integer NOT NULL,
    id uuid NOT NULL
);
 #   DROP TABLE public.products_queues;
       public         heap    durgeshkumar    false            ?            1259    16394    products_regions    TABLE     `   CREATE TABLE public.products_regions (
    zone character(64) NOT NULL,
    id uuid NOT NULL
);
 $   DROP TABLE public.products_regions;
       public         heap    durgeshkumar    false            ?            1259    16397    users    TABLE     e   CREATE TABLE public.users (
    id uuid NOT NULL,
    email text NOT NULL,
    hash text NOT NULL
);
    DROP TABLE public.users;
       public         heap    durgeshkumar    false            ?          0    16386    products 
   TABLE DATA           ?   COPY public.products (product_code, product_value) FROM stdin;
    public          durgeshkumar    false    200   ?       ?          0    16391    products_queues 
   TABLE DATA           <   COPY public.products_queues (product_value, id) FROM stdin;
    public          durgeshkumar    false    201   ;       ?          0    16394    products_regions 
   TABLE DATA           4   COPY public.products_regions (zone, id) FROM stdin;
    public          durgeshkumar    false    202   X       ?          0    16397    users 
   TABLE DATA           0   COPY public.users (id, email, hash) FROM stdin;
    public          durgeshkumar    false    203   u       :           2606    16390    products products_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (product_code);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            durgeshkumar    false    200            <           2606    16435 $   products_queues products_queues_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.products_queues
    ADD CONSTRAINT products_queues_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.products_queues DROP CONSTRAINT products_queues_pkey;
       public            durgeshkumar    false    201            >           2606    16433 &   products_regions products_regions_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.products_regions
    ADD CONSTRAINT products_regions_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.products_regions DROP CONSTRAINT products_regions_pkey;
       public            durgeshkumar    false    202            @           2606    16404    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            durgeshkumar    false    203            ?   w   x?ʹ1 ???~?8?/?㍷??6
Da??$↌ME??!???+>`?6?\?8?arz$=N?C??u??r?ϱ!x.h?RٝR??ι]ۡ?
?<?MA?tԔȸ?a\??Z?k?(?      ?      x?????? ? ?      ?      x?????? ? ?      ?   ?   x????0 Й~G?Bo[?n0??D#????????2??{ΰ?????*2?@?ZȒɲ??????sE;?uNa?O??&?}???ƌ
G??W][?y?????5+?4?H??~J?h???b? ?儐?'?     