const stripe = require('stripe')("sk_test_51PLNcUSEA6G6NB8g9caQ0pLg1SquV86plAZxGe2euLYWKXYtkPB0jJ48X1DlA0TTbbnaMudpTY4jnDxSQLUyLqus00NFPVKmgK");
require('dotenv').config()

async function checkoutProduct(req, res) {
    try {
        const { products } = req.body; 

        const lineItems = products.map(item => ({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: item.productId.productName,
                    images: item.productId.productImage, 
                    description: item.productId.description,
                },
                unit_amount: item.productId.price * 100, 
            },
            quantity: item.productQuantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url:`${process.env.FRONTEND_DOMAIN_URL}/pay-success`,
            cancel_url: `${process.env.FRONTEND_DOMAIN_URL}/pay-rejected`,
            customer_email: req.email,
            billing_address_collection: 'required',
            shipping_address_collection: {
                allowed_countries: ['IN'],
            },
        });

        res.status(200).json({
            session: session.id,
            success: true,
            error: false
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

module.exports = checkoutProduct;
