import { ChainId, Pair, WETH, DXD, Fees, TEST_TOKENS, JSBI } from '../src'
import { ZERO_ADDRESS } from '../src/constants'

describe('fees', () => {
  describe('fetchSwapFee', () => {
    it('Get WETH-DXD kovan fee', async () => {
      const WETH_DXD_KOVAN = await Pair.fetchData(WETH[ChainId.KOVAN], DXD[ChainId.KOVAN])
      const DXD_WEENUS_KOVAN = await Pair.fetchData(DXD[ChainId.KOVAN], TEST_TOKENS.WEENUS[ChainId.KOVAN])
      const DXDKovanFee = await Fees.fetchSwapFee(WETH_DXD_KOVAN.liquidityToken)
      expect(DXDKovanFee.fee).toEqual(JSBI.BigInt(20))
      const DXD_WEENUS_KOVAN_FEES = await Fees.fetchSwapFee(DXD_WEENUS_KOVAN.liquidityToken)
      expect(DXD_WEENUS_KOVAN_FEES.fee).toEqual(JSBI.BigInt(30))
    })
  })
  
  describe('fetchSwapFees', () => {
    it('Get WETH-DXD kovan fee', async () => {
      const WETH_DXD_KOVAN = await Pair.fetchData(WETH[ChainId.KOVAN], DXD[ChainId.KOVAN])
      const DXD_WEENUS_KOVAN = await Pair.fetchData(DXD[ChainId.KOVAN], TEST_TOKENS.WEENUS[ChainId.KOVAN])
      const fees = await Fees.fetchSwapFees([WETH_DXD_KOVAN.liquidityToken, DXD_WEENUS_KOVAN.liquidityToken])
      expect(fees[0].fee).toEqual(JSBI.BigInt(20))
      expect(fees[1].fee).toEqual(JSBI.BigInt(30))
    })
  })
  
  describe('fetchAllSwapFees', () => {
    it('Get all kovan fees', async () => {
      const WETH_DXD_KOVAN = await Pair.fetchData(WETH[ChainId.KOVAN], DXD[ChainId.KOVAN])
      const WETH_WEENUS_KOVAN = await Pair.fetchData(WETH[ChainId.KOVAN], TEST_TOKENS.WEENUS[ChainId.KOVAN])
      const DXD_WEENUS_KOVAN = await Pair.fetchData(DXD[ChainId.KOVAN], TEST_TOKENS.WEENUS[ChainId.KOVAN])
      const fees = await Fees.fetchAllSwapFees(ChainId.KOVAN)
      expect(fees[WETH_DXD_KOVAN.liquidityToken.address].fee).toEqual(JSBI.BigInt(20))
      expect(fees[WETH_WEENUS_KOVAN.liquidityToken.address].fee).toEqual(JSBI.BigInt(30))
      expect(fees[DXD_WEENUS_KOVAN.liquidityToken.address].fee).toEqual(JSBI.BigInt(30))
    })

    it('Get kovan fees with cache', async () => {
      const WETH_DXD_KOVAN = await Pair.fetchData(WETH[ChainId.KOVAN], DXD[ChainId.KOVAN])
      const WETH_WEENUS_KOVAN = await Pair.fetchData(WETH[ChainId.KOVAN], TEST_TOKENS.WEENUS[ChainId.KOVAN])
      const DXD_WEENUS_KOVAN = await Pair.fetchData(DXD[ChainId.KOVAN], TEST_TOKENS.WEENUS[ChainId.KOVAN])
      const fees = await Fees.fetchAllSwapFees(ChainId.KOVAN, {
        [WETH_DXD_KOVAN.liquidityToken.address] : {
          fee: JSBI.BigInt(20),
          owner: ZERO_ADDRESS
        },
        [WETH_WEENUS_KOVAN.liquidityToken.address] : {
          fee: JSBI.BigInt(30),
          owner: ZERO_ADDRESS
        }
      })
      expect(fees[WETH_DXD_KOVAN.liquidityToken.address].fee).toEqual(JSBI.BigInt(20))
      expect(fees[WETH_WEENUS_KOVAN.liquidityToken.address].fee).toEqual(JSBI.BigInt(30))
      expect(fees[DXD_WEENUS_KOVAN.liquidityToken.address].fee).toEqual(JSBI.BigInt(30))
    })
  })
  
  describe('fetchProtocolFee', () => {
    it('Get WETH-DXD kovan fee', async () => {
      const protocolFee = await Fees.fetchProtocolFee(ChainId.KOVAN)
      expect(protocolFee.feeDenominator).toEqual(5)
      expect(protocolFee.feeReceiver).toEqual(ZERO_ADDRESS)
    })
  })
})
