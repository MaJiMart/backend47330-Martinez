import CartService from '../services/cartService.js';
import ProductService from '../services/productService.js';
import UserService from '../services/userService.js';
import TicketController from './ticketController.js';
import { NotFound, Exception, generateUniqueCode } from '../utilities.js';

export default class CartController {
  static async getCarts(query = {}) {
    try {
      const carts = await CartService.getCarts(query);
      return carts;
    } catch (error) {
      throw new Exception(`Error getting carts: ${error.message}`, 500);
    }
  }

  static async createCart(data) {
    try {
      return await CartService.createCart(data);
    } catch (error) {
      throw new Exception(`Error creating cart: ${error.message}`, 500);
    }
  }

  static async getCart(cid) {
    const cart = await CartService.getCart(cid);
    if (!cart) {
      throw new NotFound(`NOT FOUND: We can't find the cart with ID: ${cid}`);
    }
    return cart;
  }

  static async updateCart(cid, data) {
    try {
      await CartController.getCart(cid);
      await CartService.updateCart(cid, data);
    } catch (error) {
      throw new Exception(`Error updating cart: ${error.message}`, 500);
    }
  }

  static async updateQuantity(cid, pid, data) {
    return await CartService.updateQuantity(cid, pid, data);
  }

  static async addProductToCart(cid, pid) {
    return await CartService.addProductToCart(cid, pid);
  }

  static async deleteProductToCart(cid, pid) {
    return await CartService.deleteProductToCart(cid, pid);
  }

  static async emptyCart(cid) {
    return await CartService.emptyCart(cid);
  }

  static async purchaseCart(cid, user) {
    try {
      const cart = await CartController.getCart(cid);
      const userEmailAddress = user;
      const failedProducts = [];
      const purchasedProducts = [];
      let amount = 0;

      for (const cartProduct of cart.products) {
        
        const product = await ProductService.getProduct(cartProduct.product);
        product.stock -= cartProduct.quantity;
        await product.save()
        amount += product.price * cartProduct.quantity;
        
        /* if (product.stock >= cartProduct.quantity) {
          product.stock -= cartProduct.quantity;
          await product.save();

          purchasedProducts.push({
            product: cartProduct.product,
            quantity: cartProduct.quantity,
          });

          amount += product.price * cartProduct.quantity;
          console.log(amount);
        } else {
          failedProducts.push(cartProduct.product);
        } */
      }

      const remainingProducts = cart.products.filter(
        (cartProduct) =>
          !failedProducts.includes(cartProduct.product.toString())
      );

      cart.products = remainingProducts;
      await cart.save();

      const ticket = await TicketController.createTicket({
        code: generateUniqueCode(),
        amount: amount,
        purchaser: userEmailAddress
      });
      console.log('Ticket:', ticket);
    } catch (error) {
      throw new Exception(
        `Error processing the purchase: ${error.message}`,
        500
      );
    }
  }
}
