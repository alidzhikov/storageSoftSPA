// import React from "react";
// //import { Page, Text, View, Document, StyleSheet, PDFViewer, Font } from '@react-pdf/renderer';
// import ReactDOM from 'react-dom';
// Font.register({ family: 'Oswald', src: 'http://fonts.gstatic.com/s/robotocondensed/v14/Zd2E9abXLFGSr9G3YK2MsDR-eWpsHSw83BRsAQElGgc.ttf' });
// Font.register({ family: 'Oswald2', src: 'http://fonts.gstatic.com/s/rocksalt/v6/Q94aHXFHGip10K5uxi1jOKCWcynf_cDxXwCLxiixG1c.ttf' });

// const styles = StyleSheet.create({
//   document:{
//     height: '800px',
//     width: '100%'
//   },
//   page: {
//     flexDirection: "row"
//   },
//   section: {
//     flexGrow: 1
//   },
//   td: {
//     fontFamily: 'Oswald2',
//     display: 'table-cell',
//     color: 'red',
//     width: '30px'
//   },
//   tr: {
//     display: 'table-row'
//   },
//   table: {
//     display: 'table'
//   }
// });
// const products = (order) => {
//   return (
//     <View style={styles.table}>
//       <Text style={styles.td}>Име  Размер  Брой  Цена 1  Цена asdasd</Text>
//       {order.orderProducts.map((prod,i) => (
//         // <View style={styles.tr}>
//         //   <Text style={styles.td}>{prod.product.name}</Text>
//         //   <Text style={styles.td}>{prod.product.size}</Text>
//         //   <Text style={styles.td}>{prod.qty}</Text>
//         //   <Text style={styles.td}>{prod.price}</Text>
//         //   <Text style={styles.td}>{prod.price*prod.qty}</Text>
//         // </View>
//          <Text>{prod.product.name} {prod.product.size} {prod.qty} {prod.price} {prod.price*prod.qty}</Text>
//         )
//       )}
//     </View>
//   );
// };
// const orderPDF = (order) => (
//   <Document style={styles.document}>
//     <Page size="A4" style={styles.page}>
//       {products(order)}
//     </Page>
//   </Document>
// );

// export default function OrderViewPDF(order) {
//   console.log(order);
//   const orderDoc = orderPDF(order);
//   let root = document.getElementById('root');
//   root.style = "height: 1200px; width: 100%;";
//   root.style = 
//   ReactDOM.render(
//     (<PDFViewer>{orderDoc}</PDFViewer>),
//     root
//     );
// }