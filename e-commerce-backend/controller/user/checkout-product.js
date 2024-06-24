const stripe = require('stripe')("sk_test_51PLNcUSEA6G6NB8g9caQ0pLg1SquV86plAZxGe2euLYWKXYtkPB0jJ48X1DlA0TTbbnaMudpTY4jnDxSQLUyLqus00NFPVKmgK");

async function checkoutProduct(req, res) {
    try {
        const { products } = req.body; // Ensure you get the userId from the request body 

        const lineItems = products.map(item => ({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: item.productId.productName,
                    images: item.productId.productImage, // Pass the entire array of product images
                    description: item.productId.description, // Added description
                },
                unit_amount: item.productId.price * 100, // Price in smallest currency unit (cents)
            },
            quantity: item.productQuantity,
        }));
        console.log('lineItems: ', lineItems);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:3000/pay-success',
            cancel_url: 'http://localhost:3000/pay-rejected',
            customer_email: req.email, // Assuming you have access to the user's email address
            billing_address_collection: 'required', // Ensure billing address is collected
            shipping_address_collection: {
                allowed_countries: ['IN'], // Restrict shipping to India
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
