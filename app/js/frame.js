$(document).ready(function() {
    $("#import").click(function() {

         var iframe = document.getElementById("frame");
        iframe.sandbox.add('allow-same-origin');
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        let div = document.getElementsByClassName('order-item-header-right-info')
        console.log(iframeDoc);
//         if (iframe.contentDocument.readyState === "complete") {
//
//             var iframeDocument = iframe.contentDocument;
//
// // Parse the content or perform any other desired operations
// // For example, you can retrieve the text content of an element with ID "targetElement"
//             var targetElement = iframeDocument.getElementsByClassName('order-item-header-right');
//             var parsedContent = targetElement.textContent;
//
// // Display the parsed content
//             console.log(parsedContent);
//         } else {
// // If the iframe content hasn't loaded yet, you can handle it accordingly
//             console.log("Iframe content is still loading...");
//         }
    });
});
