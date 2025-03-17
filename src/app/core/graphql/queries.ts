import { gql } from 'apollo-angular';

export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    categories {
      slug
      name
      products {
        name
        slug
      }
    }
  }
`;

export const GET_CATEGORY_BY_SLUG = gql`
  query GetCategoryBySlug($slug: String!) {
    category (where: { slug: $slug }) {
      slug
      name
      products {
        slug
        name
        image { url }
        description
        price
      }
    }
  }
`;

export const GET_PRODUCT_BY_SLUG = gql`
  query GetProductBySlug($slug: String!) {
    product(where: { slug: $slug }) {
      slug
      name
      image { url }
      description
      price
      category {
        slug
        name
      }
    }
  }
`;

export const GET_RELATED_PRODUCTS = gql`
  query GetRelatedProducts($categorySlug: String!, $currentProductSlug: String!) {
    products(
      where: {
        category: { slug: $categorySlug },
        slug_not: $currentProductSlug
      },
      first: 3
    ) {
      slug
      name
      image { url }
      price
    }
  }
`;
