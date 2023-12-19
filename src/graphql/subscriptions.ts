/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onDeleteRelationLink = /* GraphQL */ `
  subscription OnDeleteRelationLink($userID: ID) {
    onDeleteRelationLink(userID: $userID) {
      id
      userID
      user {
        id
        name
        email
        phone
        status
        active
        avatar
        search
        createdAt
        updatedAt
      }
      relationID
      relation {
        id
        type
        mode
        name
        description
        avatar
        reference
        members
        admins
        updatedAt
        status
        search
        config
        createdAt
      }
      type
      notify
      updatedAt
      search
      percentage
      createdAt
    }
  }
`;
export const onCreateRelationLink = /* GraphQL */ `
  subscription OnCreateRelationLink($userID: ID) {
    onCreateRelationLink(userID: $userID) {
      id
      userID
      user {
        id
        name
        email
        phone
        status
        active
        avatar
        search
        createdAt
        updatedAt
      }
      relationID
      relation {
        id
        type
        mode
        name
        description
        avatar
        reference
        members
        admins
        updatedAt
        status
        search
        config
        createdAt
      }
      type
      notify
      updatedAt
      search
      percentage
      createdAt
    }
  }
`;
export const onUpdateRelationLink = /* GraphQL */ `
  subscription OnUpdateRelationLink($userID: ID) {
    onUpdateRelationLink(userID: $userID) {
      id
      userID
      user {
        id
        name
        email
        phone
        status
        active
        avatar
        search
        createdAt
        updatedAt
      }
      relationID
      relation {
        id
        type
        mode
        name
        description
        avatar
        reference
        members
        admins
        updatedAt
        status
        search
        config
        createdAt
      }
      type
      notify
      updatedAt
      search
      percentage
      createdAt
    }
  }
`;
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($relationID: ID) {
    onCreateMessage(relationID: $relationID) {
      id
      relationID
      relation {
        id
        type
        mode
        name
        description
        avatar
        reference
        members
        admins
        updatedAt
        status
        search
        config
        createdAt
      }
      restrictedContentID
      restrictedContent {
        id
        relationID
        order
        group
        subGroup
        title
        description
        notes
        type
        isAWSVDO
        thumbnail
        content
        search
        identityId
        lifetime
        start
        expiration
        percentage
        createdAt
        updatedAt
      }
      userID
      user {
        id
        name
        email
        phone
        status
        active
        avatar
        search
        createdAt
        updatedAt
      }
      type
      content
      search
      identityId
      createdAt
      status
      updatedAt
    }
  }
`;
export const onCreateOrderAdm = /* GraphQL */ `
  subscription OnCreateOrderAdm {
    onCreateOrderAdm {
      id
      userID
      user {
        id
        name
        email
        phone
        status
        active
        avatar
        search
        createdAt
        updatedAt
      }
      status
      createdAt
      items {
        nextToken
      }
      couponID
      couponName
      couponDiscount
      deliveryPrice
      total
      rating
      ratingNotes
      orderPagarmeID
      addressReference
      addressStreet
      addressNumber
      addressComplement
      addressZipcode
      addressNeighborhood
      addressCity
      addressState
      addressCountry
      notes
      qrCodePix
      qrCodePixUrl
      payMethod
      updatedAt
    }
  }
`;
export const onCreateLog = /* GraphQL */ `
  subscription OnCreateLog {
    onCreateLog {
      id
      userID
      tag
      source
      notes
      message
      page
      manufacturer
      model
      osName
      osVersion
      platform
      uuid
      ip
      city
      region
      country
      provider
      lat
      lng
      createdAt
      user {
        id
        name
        email
        phone
        status
        active
        avatar
        search
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const onDeleteFavorite = /* GraphQL */ `
  subscription OnDeleteFavorite($userID: ID) {
    onDeleteFavorite(userID: $userID) {
      id
      userID
      user {
        id
        name
        email
        phone
        status
        active
        avatar
        search
        createdAt
        updatedAt
      }
      type
      favoriteID
      link
      content
      productID
      product {
        id
        alias
        status
        category
        subCategory
        type
        relationID
        preparationTime
        code
        name
        description
        contentTitle
        contentTitle2
        contentTitle3
        content
        content2
        content3
        tags
        changeFreq
        priority
        price_of
        price
        qty
        stockControl
        photo1
        photo2
        photo3
        photo4
        photo5
        thumbnail
        thumbnailSrc
        thumbnailCropper
        titlePadX
        titlePadY
        contentPadX
        contentPadY
        optionTitle
        sideColumn
        sideColumnPadX
        sideColumnPadY
        sideColumnContent
        optionSideColumn
        footerSm
        footerLg
        hideInMenu
        createdAt
        search
        hideInSearch
        updatedAt
      }
      relationID
      relation {
        id
        type
        mode
        name
        description
        avatar
        reference
        members
        admins
        updatedAt
        status
        search
        config
        createdAt
      }
      pageID
      page {
        id
        alias
        status
        type
        menu
        order
        title
        titlePadX
        titlePadY
        description
        content
        contentPadX
        contentPadY
        tags
        thumbnail
        thumbnailSrc
        thumbnailCropper
        changeFreq
        priority
        optionTitle
        sideColumn
        sideColumnPadX
        sideColumnPadY
        sideColumnContent
        optionSideColumn
        footerSm
        footerLg
        hideInMenu
        createdAt
        search
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateFavorite = /* GraphQL */ `
  subscription OnCreateFavorite($userID: ID) {
    onCreateFavorite(userID: $userID) {
      id
      userID
      user {
        id
        name
        email
        phone
        status
        active
        avatar
        search
        createdAt
        updatedAt
      }
      type
      favoriteID
      link
      content
      productID
      product {
        id
        alias
        status
        category
        subCategory
        type
        relationID
        preparationTime
        code
        name
        description
        contentTitle
        contentTitle2
        contentTitle3
        content
        content2
        content3
        tags
        changeFreq
        priority
        price_of
        price
        qty
        stockControl
        photo1
        photo2
        photo3
        photo4
        photo5
        thumbnail
        thumbnailSrc
        thumbnailCropper
        titlePadX
        titlePadY
        contentPadX
        contentPadY
        optionTitle
        sideColumn
        sideColumnPadX
        sideColumnPadY
        sideColumnContent
        optionSideColumn
        footerSm
        footerLg
        hideInMenu
        createdAt
        search
        hideInSearch
        updatedAt
      }
      relationID
      relation {
        id
        type
        mode
        name
        description
        avatar
        reference
        members
        admins
        updatedAt
        status
        search
        config
        createdAt
      }
      pageID
      page {
        id
        alias
        status
        type
        menu
        order
        title
        titlePadX
        titlePadY
        description
        content
        contentPadX
        contentPadY
        tags
        thumbnail
        thumbnailSrc
        thumbnailCropper
        changeFreq
        priority
        optionTitle
        sideColumn
        sideColumnPadX
        sideColumnPadY
        sideColumnContent
        optionSideColumn
        footerSm
        footerLg
        hideInMenu
        createdAt
        search
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateQrCodeScan = /* GraphQL */ `
  subscription OnCreateQrCodeScan($userID: ID) {
    onCreateQrCodeScan(userID: $userID) {
      id
      userID
      relationID
      uuid
      createdAt
      updatedAt
    }
  }
`;
export const onCreateVideoObject = /* GraphQL */ `
  subscription OnCreateVideoObject(
    $filter: ModelSubscriptionVideoObjectFilterInput
  ) {
    onCreateVideoObject(filter: $filter) {
      id
      token
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateVideoObject = /* GraphQL */ `
  subscription OnUpdateVideoObject(
    $filter: ModelSubscriptionVideoObjectFilterInput
  ) {
    onUpdateVideoObject(filter: $filter) {
      id
      token
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteVideoObject = /* GraphQL */ `
  subscription OnDeleteVideoObject(
    $filter: ModelSubscriptionVideoObjectFilterInput
  ) {
    onDeleteVideoObject(filter: $filter) {
      id
      token
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCart = /* GraphQL */ `
  subscription OnCreateCart(
    $filter: ModelSubscriptionCartFilterInput
    $userID: String
  ) {
    onCreateCart(filter: $filter, userID: $userID) {
      id
      userID
      productID
      product {
        id
        alias
        status
        category
        subCategory
        type
        relationID
        preparationTime
        code
        name
        description
        contentTitle
        contentTitle2
        contentTitle3
        content
        content2
        content3
        tags
        changeFreq
        priority
        price_of
        price
        qty
        stockControl
        photo1
        photo2
        photo3
        photo4
        photo5
        thumbnail
        thumbnailSrc
        thumbnailCropper
        titlePadX
        titlePadY
        contentPadX
        contentPadY
        optionTitle
        sideColumn
        sideColumnPadX
        sideColumnPadY
        sideColumnContent
        optionSideColumn
        footerSm
        footerLg
        hideInMenu
        createdAt
        search
        hideInSearch
        updatedAt
      }
      options {
        nextToken
      }
      qty
      changeName
      changeDescription
      changeQtyBlend
      changePriceAdjustment
      blendID
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCart = /* GraphQL */ `
  subscription OnUpdateCart(
    $filter: ModelSubscriptionCartFilterInput
    $userID: String
  ) {
    onUpdateCart(filter: $filter, userID: $userID) {
      id
      userID
      productID
      product {
        id
        alias
        status
        category
        subCategory
        type
        relationID
        preparationTime
        code
        name
        description
        contentTitle
        contentTitle2
        contentTitle3
        content
        content2
        content3
        tags
        changeFreq
        priority
        price_of
        price
        qty
        stockControl
        photo1
        photo2
        photo3
        photo4
        photo5
        thumbnail
        thumbnailSrc
        thumbnailCropper
        titlePadX
        titlePadY
        contentPadX
        contentPadY
        optionTitle
        sideColumn
        sideColumnPadX
        sideColumnPadY
        sideColumnContent
        optionSideColumn
        footerSm
        footerLg
        hideInMenu
        createdAt
        search
        hideInSearch
        updatedAt
      }
      options {
        nextToken
      }
      qty
      changeName
      changeDescription
      changeQtyBlend
      changePriceAdjustment
      blendID
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCart = /* GraphQL */ `
  subscription OnDeleteCart(
    $filter: ModelSubscriptionCartFilterInput
    $userID: String
  ) {
    onDeleteCart(filter: $filter, userID: $userID) {
      id
      userID
      productID
      product {
        id
        alias
        status
        category
        subCategory
        type
        relationID
        preparationTime
        code
        name
        description
        contentTitle
        contentTitle2
        contentTitle3
        content
        content2
        content3
        tags
        changeFreq
        priority
        price_of
        price
        qty
        stockControl
        photo1
        photo2
        photo3
        photo4
        photo5
        thumbnail
        thumbnailSrc
        thumbnailCropper
        titlePadX
        titlePadY
        contentPadX
        contentPadY
        optionTitle
        sideColumn
        sideColumnPadX
        sideColumnPadY
        sideColumnContent
        optionSideColumn
        footerSm
        footerLg
        hideInMenu
        createdAt
        search
        hideInSearch
        updatedAt
      }
      options {
        nextToken
      }
      qty
      changeName
      changeDescription
      changeQtyBlend
      changePriceAdjustment
      blendID
      createdAt
      updatedAt
    }
  }
`;
export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder(
    $filter: ModelSubscriptionOrderFilterInput
    $userID: String
  ) {
    onCreateOrder(filter: $filter, userID: $userID) {
      id
      userID
      user {
        id
        name
        email
        phone
        status
        active
        avatar
        search
        createdAt
        updatedAt
      }
      status
      createdAt
      items {
        nextToken
      }
      couponID
      couponName
      couponDiscount
      deliveryPrice
      total
      rating
      ratingNotes
      orderPagarmeID
      addressReference
      addressStreet
      addressNumber
      addressComplement
      addressZipcode
      addressNeighborhood
      addressCity
      addressState
      addressCountry
      notes
      qrCodePix
      qrCodePixUrl
      payMethod
      updatedAt
    }
  }
`;
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder(
    $filter: ModelSubscriptionOrderFilterInput
    $userID: String
  ) {
    onUpdateOrder(filter: $filter, userID: $userID) {
      id
      userID
      user {
        id
        name
        email
        phone
        status
        active
        avatar
        search
        createdAt
        updatedAt
      }
      status
      createdAt
      items {
        nextToken
      }
      couponID
      couponName
      couponDiscount
      deliveryPrice
      total
      rating
      ratingNotes
      orderPagarmeID
      addressReference
      addressStreet
      addressNumber
      addressComplement
      addressZipcode
      addressNeighborhood
      addressCity
      addressState
      addressCountry
      notes
      qrCodePix
      qrCodePixUrl
      payMethod
      updatedAt
    }
  }
`;
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder(
    $filter: ModelSubscriptionOrderFilterInput
    $userID: String
  ) {
    onDeleteOrder(filter: $filter, userID: $userID) {
      id
      userID
      user {
        id
        name
        email
        phone
        status
        active
        avatar
        search
        createdAt
        updatedAt
      }
      status
      createdAt
      items {
        nextToken
      }
      couponID
      couponName
      couponDiscount
      deliveryPrice
      total
      rating
      ratingNotes
      orderPagarmeID
      addressReference
      addressStreet
      addressNumber
      addressComplement
      addressZipcode
      addressNeighborhood
      addressCity
      addressState
      addressCountry
      notes
      qrCodePix
      qrCodePixUrl
      payMethod
      updatedAt
    }
  }
`;
export const onCreateQuiz = /* GraphQL */ `
  subscription OnCreateQuiz($filter: ModelSubscriptionQuizFilterInput) {
    onCreateQuiz(filter: $filter) {
      id
      name
      description
      search
      questions {
        nextToken
      }
      status
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateQuiz = /* GraphQL */ `
  subscription OnUpdateQuiz($filter: ModelSubscriptionQuizFilterInput) {
    onUpdateQuiz(filter: $filter) {
      id
      name
      description
      search
      questions {
        nextToken
      }
      status
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteQuiz = /* GraphQL */ `
  subscription OnDeleteQuiz($filter: ModelSubscriptionQuizFilterInput) {
    onDeleteQuiz(filter: $filter) {
      id
      name
      description
      search
      questions {
        nextToken
      }
      status
      createdAt
      updatedAt
    }
  }
`;
