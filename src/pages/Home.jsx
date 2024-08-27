import DefaultLayout from "../layouts/default";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card"
import "../styles/App.css"
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
  } from "@nextui-org/table";
  import MonthlySale from "../statistics/MonthlySale";
//   import HighSale from "../statistics/HighSale";
  function Home(){
    return(
        <DefaultLayout>
            <h1 className="text-center text-xl font-black">WELCOME TO THE DASHBOARD</h1>
            <div id="Tdiv" className=" flex flex-row place-content-evenly w-auto ">
                <Card id="crd1" className="Tcrds ">
                    <CardHeader>
                        <h2 className="text-xl font-bold">Total items in Stock</h2>
                    </CardHeader>
                    <CardBody>
                        <h3>100</h3>
                    </CardBody>
                </Card>
                <Card id="crd2" className="Tcrds">
                    <CardHeader>
                        <h2 className="text-xl font-bold">Number of Purchases</h2>
                    </CardHeader>
                    <CardBody>
                        <h3>100</h3>
                    </CardBody>
                </Card>
            </div>
            <div className= "flex w-full flex-row">

                <MonthlySale/>
            </div> 
            <div id="Cdiv" className=" grid grid-cols-2">
            <div>
                <div>
                <h2>Items Low In Stock</h2>
                <Table >
                    <TableHeader>
                        <TableColumn>Item</TableColumn>
                        <TableColumn>remaining</TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow key="1">
                            <TableCell>Hello</TableCell>
                            <TableCell>2</TableCell>
                        </TableRow>
                        <TableRow key="2">
                            <TableCell>Hello</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                </div>

            </div>
                <div>
                    <h2>
                        Recent Transactions
                    </h2>
                    <Table className="ml-2">
                        <TableHeader>
                            <TableColumn>Item</TableColumn>
                            <TableColumn>Quantity</TableColumn>
                        </TableHeader>
                        <TableBody>
                            <TableRow key="1">
                                <TableCell>Item 1</TableCell>
                                <TableCell>30</TableCell>
                            </TableRow>
                            <TableRow key="2">
                                <TableCell>Item 2</TableCell>
                                <TableCell>30</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>


                
   

        </DefaultLayout>

    )

}
export default Home