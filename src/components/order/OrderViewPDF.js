import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function OrderViewPDF(order) {
  const styles = {
		header: {
			fontSize: 18,
			bold: true,
			alignment: 'right',
			margin: [0, 190, 0, 80]
		},
		subheader: {
			fontSize: 14
		},
		superMargin: {
			margin: [20, 0, 40, 0],
			fontSize: 15
		}
	}

  const products = order.orderProducts.map(oPr => { return [oPr.product.name, oPr.product.size, oPr.qty, oPr.price, oPr.price*oPr.qty]});
  const docDefinition = {
    content: [
      {
        layout: 'lightHorizontalLines', // optional
        table: {
          headerRows: 1,
          widths: [ '*' ],
          body: [
            [ { text: 'МО-11 ЕООД', style: 'header' } ],
            [ { text: 'Асеновград, ул. Просвета 10, тел: 088777777, ел. поща: mo-11.ltd@outlook.com', bold: true } ],
          ]
        }
      },
      {
        text: 'Стокова разписка',
        style: 'title',
        alignment: 'center'
      },
      {
        layout: 'lightHorizontalLines', // optional
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: [ '*', '*', 100, '*', 100 ],
          body: [
            [ 'Име', 'Размер', 'Брой', 'Цена 1', 'Цена'],
            ...products,
            [ { text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4', 'las' ]
          ]
        }
      }
    ],
    styles: {
      header: {
        fontSize: 15,
        bold: true,
        alignment: 'right',
        //margin: [0, 190, 0, 80],
      },
      title: {
        margin: [0, 50, 0, 20],
        fontSize: 18,
        bold: true
      }
    }
  }
  pdfMake.createPdf(docDefinition).open();
}