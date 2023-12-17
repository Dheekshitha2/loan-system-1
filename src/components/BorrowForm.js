import React from 'react';

function BorrowForm({ selectedItems }) {
    const formEmbedUrl = "https://forms.office.com/Pages/ResponsePage.aspx?id=Xu-lWwkxd06Fvc_rDTR-gp7WDPimNTRKv31Gdpy30BpUOUJXVFNIVkE2TUJGR09RSkNSNFVWVzExNC4u&embed=true";

    return (
        <div>
            <h3>Items to Borrow:</h3>
            <ul>
                {selectedItems.map((item, index) => (
                    <li key={index}>{item.item_name} (Qty: {item.quantity})</li>
                ))}
            </ul>
            <iframe
                src={formEmbedUrl}
                title="Borrowing Form"
                width="640px"
                height="480px"
                frameborder="0"
                marginheight="0"
                marginwidth="0"
                style={{ border: 'none', maxWidth: '100%', maxHeight: '100vh' }}
                allowfullscreen
                webkitallowfullscreen
                mozallowfullscreen
                msallowfullscreen
            >
                Loading…
            </iframe>
        </div>
    );
}

export default BorrowForm;

