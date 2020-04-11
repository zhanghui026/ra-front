import React from 'react';
import classnames from 'classnames';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link, useTranslate, useQueryWithStore } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    container: { minWidth: '35em', marginLeft: '1em' },
    rightAlignedCell: { textAlign: 'right' },
    boldCell: { fontWeight: 'bold' },
});

const Basket = ({ record }) => {
    const classes = useStyles();
    const translate = useTranslate();

    const { loaded, data } = useQueryWithStore(
        {
            type: 'getMany',
            resource: 'products',
            payload: {
                ids: record ? record.basket.map(item => item.productId) : [],
            },
        },
        {},
        (state) => { 
            const productIds = record
                ? record.basket.map(item => item.productId)
                : [];
           console.log("products",productIds);
            const result = productIds
                .map(
                    (productId) =>
                        state.admin.resources.products.data[
                            productId
                        ]
                )
                .filter(r => typeof r !== 'undefined')
                .reduce(
                    (prev, next) => {
                        prev[next.id] = next;
                        return prev;
                    },
                    {}
                );
            console.log("result",result);
                return result;
        }
    );

    if (!loaded || !record) return null;

    if (loaded && record) {
        console.log("sss:",data)
    }

    return (
        <Paper className={classes.container} elevation={2}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            {translate(
                                'resources.commands.fields.basket.reference'
                            )}
                        </TableCell>
                        <TableCell className={classes.rightAlignedCell}>
                            {translate(
                                'resources.commands.fields.basket.unit_price'
                            )}
                        </TableCell>
                        <TableCell className={classes.rightAlignedCell}>
                            {translate(
                                'resources.commands.fields.basket.quantity'
                            )}
                        </TableCell>
                        <TableCell className={classes.rightAlignedCell}>
                            {translate(
                                'resources.commands.fields.basket.total'
                            )}
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {record.basket.map(
                        (item) =>
                            data[item.productId] && (
                                <TableRow key={item.productId}>
                                    <TableCell>
                                        <Link
                                            to={`/products/${item.productId}`}
                                        >
                                            {
                                                data[item.productId]
                                                    .reference
                                            }
                                        </Link>
                                    </TableCell>
                                    <TableCell
                                        className={classes.rightAlignedCell}
                                    >
                                        {data[
                                            item.productId
                                        ].price.toLocaleString(undefined, {
                                            style: 'currency',
                                            currency: 'USD',
                                        })}
                                    </TableCell>
                                    <TableCell
                                        className={classes.rightAlignedCell}
                                    >
                                        {item.quantity}
                                    </TableCell>
                                    <TableCell
                                        className={classes.rightAlignedCell}
                                    >
                                        {(
                                            data[item.productId].price *
                                            item.quantity
                                        ).toLocaleString(undefined, {
                                            style: 'currency',
                                            currency: 'USD',
                                        })}
                                    </TableCell>
                                </TableRow>
                            )
                    )}
                    <TableRow>
                        <TableCell colSpan={2} />
                        <TableCell>
                            {translate('resources.commands.fields.basket.sum')}
                        </TableCell>
                        <TableCell className={classes.rightAlignedCell}>
                            {record.totalExTaxes.toLocaleString(undefined, {
                                style: 'currency',
                                currency: 'USD',
                            })}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2} />
                        <TableCell>
                            {translate(
                                'resources.commands.fields.basket.delivery'
                            )}
                        </TableCell>
                        <TableCell className={classes.rightAlignedCell}>
                            {record.deliveryFees.toLocaleString(undefined, {
                                style: 'currency',
                                currency: 'USD',
                            })}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2} />
                        <TableCell>
                            {translate(
                                'resources.commands.fields.basket.tax_rate'
                            )}
                        </TableCell>
                        <TableCell className={classes.rightAlignedCell}>
                            {record.taxRate.toLocaleString(undefined, {
                                style: 'percent',
                            })}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2} />
                        <TableCell className={classes.boldCell}>
                            {translate(
                                'resources.commands.fields.basket.total'
                            )}
                        </TableCell>
                        <TableCell
                            className={classnames(
                                classes.boldCell,
                                classes.rightAlignedCell
                            )}
                        >
                            {record.total.toLocaleString(undefined, {
                                style: 'currency',
                                currency: 'USD',
                            })}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
    );
};

export default Basket;
