/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const adminDeleteUser = /* GraphQL */ `
  mutation AdminDeleteUser($id: String) {
    adminDeleteUser(id: $id)
  }
`;
export const adminCreateUser = /* GraphQL */ `
  mutation AdminCreateUser(
    $name: String
    $email: String
    $phone: String
    $id: String
    $messageAction: String
    $passwordLength: Int
    $resendTempPass: Int
    $confirmSignUp: Int
  ) {
    adminCreateUser(
      name: $name
      email: $email
      phone: $phone
      id: $id
      messageAction: $messageAction
      passwordLength: $passwordLength
      resendTempPass: $resendTempPass
      confirmSignUp: $confirmSignUp
    )
  }
`;
export const adminAddUserToGroup = /* GraphQL */ `
  mutation AdminAddUserToGroup($username: String, $groups: String) {
    adminAddUserToGroup(username: $username, groups: $groups)
  }
`;
export const createGroupUser = /* GraphQL */ `
  mutation CreateGroupUser(
    $input: CreateGroupUserInput!
    $condition: ModelGroupUserConditionInput
  ) {
    createGroupUser(input: $input, condition: $condition) {
      id
      group
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
      profileID
      profile {
        userID
        doc
        docType
        docProfession
        profession
        specialties
        subSpecialties
        bio
        gender
        birth
        birthDay
        notes
        urlUserName
        urlEnable
        allowViewEmail
        allowViewPhone
        allowCookiesPreference
        allowCookiesStatistic
        pix
        zipCodeCoverage
        schedulesSunday
        schedulesMonday
        schedulesTuesday
        schedulesWednesday
        schedulesThursday
        schedulesFriday
        schedulesSaturday
        customerPagarmeID
        uuid
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteGroupUser = /* GraphQL */ `
  mutation DeleteGroupUser(
    $input: DeleteGroupUserInput!
    $condition: ModelGroupUserConditionInput
  ) {
    deleteGroupUser(input: $input, condition: $condition) {
      id
      group
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
      profileID
      profile {
        userID
        doc
        docType
        docProfession
        profession
        specialties
        subSpecialties
        bio
        gender
        birth
        birthDay
        notes
        urlUserName
        urlEnable
        allowViewEmail
        allowViewPhone
        allowCookiesPreference
        allowCookiesStatistic
        pix
        zipCodeCoverage
        schedulesSunday
        schedulesMonday
        schedulesTuesday
        schedulesWednesday
        schedulesThursday
        schedulesFriday
        schedulesSaturday
        customerPagarmeID
        uuid
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteAddress = /* GraphQL */ `
  mutation DeleteAddress(
    $input: DeleteAddressInput!
    $condition: ModelAddressConditionInput
  ) {
    deleteAddress(input: $input, condition: $condition) {
      id
      userID
      name
      reference
      street
      number
      complement
      zipcode
      neighborhood
      city
      state
      country
      addressPagarmeID
      createdAt
      updatedAt
    }
  }
`;
export const deletePayMethod = /* GraphQL */ `
  mutation DeletePayMethod(
    $input: DeletePayMethodInput!
    $condition: ModelPayMethodConditionInput
  ) {
    deletePayMethod(input: $input, condition: $condition) {
      id
      userID
      method
      number
      holderName
      holderDocument
      expMonth
      expYear
      cvv
      brand
      label
      cardPagarmeID
      createdAt
      updatedAt
    }
  }
`;
export const createConfig = /* GraphQL */ `
  mutation CreateConfig(
    $input: CreateConfigInput!
    $condition: ModelConfigConditionInput
  ) {
    createConfig(input: $input, condition: $condition) {
      id
      validationMode
      googleAnalyticsID
      googleSiteVerification
      facebook
      twitter
      instagram
      youtube
      linkedin
      infoFooter
      minValueOrder
      phoneOrders
      phoneSac
      phoneWhatsapp
      allowPayOnDelivery
      allowLocalPickup
      deliveryOnSunday
      deliveryOnMonday
      deliveryOnTuesday
      deliveryOnWednesday
      deliveryOnThursday
      deliveryOnFriday
      deliveryOnSaturday
      deliveryOffSunday
      deliveryOffMonday
      deliveryOffTuesday
      deliveryOffWednesday
      deliveryOffThursday
      deliveryOffFriday
      deliveryOffSaturday
      showNotesCart
      notesCart
      soundOnNewOrder
      birthDayEnable
      birthDaySubject
      birthDayMessage
      footer
      navBar
      createdAt
      updatedAt
    }
  }
`;
export const updateConfig = /* GraphQL */ `
  mutation UpdateConfig(
    $input: UpdateConfigInput!
    $condition: ModelConfigConditionInput
  ) {
    updateConfig(input: $input, condition: $condition) {
      id
      validationMode
      googleAnalyticsID
      googleSiteVerification
      facebook
      twitter
      instagram
      youtube
      linkedin
      infoFooter
      minValueOrder
      phoneOrders
      phoneSac
      phoneWhatsapp
      allowPayOnDelivery
      allowLocalPickup
      deliveryOnSunday
      deliveryOnMonday
      deliveryOnTuesday
      deliveryOnWednesday
      deliveryOnThursday
      deliveryOnFriday
      deliveryOnSaturday
      deliveryOffSunday
      deliveryOffMonday
      deliveryOffTuesday
      deliveryOffWednesday
      deliveryOffThursday
      deliveryOffFriday
      deliveryOffSaturday
      showNotesCart
      notesCart
      soundOnNewOrder
      birthDayEnable
      birthDaySubject
      birthDayMessage
      footer
      navBar
      createdAt
      updatedAt
    }
  }
`;
export const createInvite = /* GraphQL */ `
  mutation CreateInvite(
    $input: CreateInviteInput!
    $condition: ModelInviteConditionInput
  ) {
    createInvite(input: $input, condition: $condition) {
      id
      name
      description
      email
      phone
      groups
      status
      createdAt
      updatedAt
    }
  }
`;
export const deleteInvite = /* GraphQL */ `
  mutation DeleteInvite(
    $input: DeleteInviteInput!
    $condition: ModelInviteConditionInput
  ) {
    deleteInvite(input: $input, condition: $condition) {
      id
      name
      description
      email
      phone
      groups
      status
      createdAt
      updatedAt
    }
  }
`;
export const updateDataBase = /* GraphQL */ `
  mutation UpdateDataBase(
    $input: UpdateDataBaseInput!
    $condition: ModelDataBaseConditionInput
  ) {
    updateDataBase(input: $input, condition: $condition) {
      id
      name
      items {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteDataBase = /* GraphQL */ `
  mutation DeleteDataBase(
    $input: DeleteDataBaseInput!
    $condition: ModelDataBaseConditionInput
  ) {
    deleteDataBase(input: $input, condition: $condition) {
      id
      name
      items {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateDataBaseItem = /* GraphQL */ `
  mutation UpdateDataBaseItem(
    $input: UpdateDataBaseItemInput!
    $condition: ModelDataBaseItemConditionInput
  ) {
    updateDataBaseItem(input: $input, condition: $condition) {
      id
      dataBaseID
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
      data
      status
      search
      notes
      createdAt
      updatedAt
    }
  }
`;
export const deleteDataBaseItem = /* GraphQL */ `
  mutation DeleteDataBaseItem(
    $input: DeleteDataBaseItemInput!
    $condition: ModelDataBaseItemConditionInput
  ) {
    deleteDataBaseItem(input: $input, condition: $condition) {
      id
      dataBaseID
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
      data
      status
      search
      notes
      createdAt
      updatedAt
    }
  }
`;
export const createFolder = /* GraphQL */ `
  mutation CreateFolder(
    $input: CreateFolderInput!
    $condition: ModelFolderConditionInput
  ) {
    createFolder(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const updateFolder = /* GraphQL */ `
  mutation UpdateFolder(
    $input: UpdateFolderInput!
    $condition: ModelFolderConditionInput
  ) {
    updateFolder(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const deleteFolder = /* GraphQL */ `
  mutation DeleteFolder(
    $input: DeleteFolderInput!
    $condition: ModelFolderConditionInput
  ) {
    deleteFolder(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const createMidia = /* GraphQL */ `
  mutation CreateMidia(
    $input: CreateMidiaInput!
    $condition: ModelMidiaConditionInput
  ) {
    createMidia(input: $input, condition: $condition) {
      id
      key
      type
      title
      subTitle
      description
      link
      identifyText
      createdAt
      updatedAt
    }
  }
`;
export const updateMidia = /* GraphQL */ `
  mutation UpdateMidia(
    $input: UpdateMidiaInput!
    $condition: ModelMidiaConditionInput
  ) {
    updateMidia(input: $input, condition: $condition) {
      id
      key
      type
      title
      subTitle
      description
      link
      identifyText
      createdAt
      updatedAt
    }
  }
`;
export const deleteMidia = /* GraphQL */ `
  mutation DeleteMidia(
    $input: DeleteMidiaInput!
    $condition: ModelMidiaConditionInput
  ) {
    deleteMidia(input: $input, condition: $condition) {
      id
      key
      type
      title
      subTitle
      description
      link
      identifyText
      createdAt
      updatedAt
    }
  }
`;
export const deleteDocument = /* GraphQL */ `
  mutation DeleteDocument(
    $input: DeleteDocumentInput!
    $condition: ModelDocumentConditionInput
  ) {
    deleteDocument(input: $input, condition: $condition) {
      id
      relationID
      ownerID
      title
      description
      notes
      conclusion
      content
      fileKey
      identityId
      createdAt
      updatedAt
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
      owner {
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
    }
  }
`;
export const createRestrictedContent = /* GraphQL */ `
  mutation CreateRestrictedContent(
    $input: CreateRestrictedContentInput!
    $condition: ModelRestrictedContentConditionInput
  ) {
    createRestrictedContent(input: $input, condition: $condition) {
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
      video {
        id
        token
        createdAt
        updatedAt
      }
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
      view {
        nextToken
      }
      messages {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateRestrictedContent = /* GraphQL */ `
  mutation UpdateRestrictedContent(
    $input: UpdateRestrictedContentInput!
    $condition: ModelRestrictedContentConditionInput
  ) {
    updateRestrictedContent(input: $input, condition: $condition) {
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
      video {
        id
        token
        createdAt
        updatedAt
      }
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
      view {
        nextToken
      }
      messages {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteRestrictedContent = /* GraphQL */ `
  mutation DeleteRestrictedContent(
    $input: DeleteRestrictedContentInput!
    $condition: ModelRestrictedContentConditionInput
  ) {
    deleteRestrictedContent(input: $input, condition: $condition) {
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
      video {
        id
        token
        createdAt
        updatedAt
      }
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
      view {
        nextToken
      }
      messages {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createMenu = /* GraphQL */ `
  mutation CreateMenu(
    $input: CreateMenuInput!
    $condition: ModelMenuConditionInput
  ) {
    createMenu(input: $input, condition: $condition) {
      id
      alias
      order
      title
      description
      orderDesc
      thumbnail
      thumbnailSrc
      thumbnailCropper
      showDescriptionPage
      showThumbnailPage
      hide
      createdAt
      updatedAt
    }
  }
`;
export const updateMenu = /* GraphQL */ `
  mutation UpdateMenu(
    $input: UpdateMenuInput!
    $condition: ModelMenuConditionInput
  ) {
    updateMenu(input: $input, condition: $condition) {
      id
      alias
      order
      title
      description
      orderDesc
      thumbnail
      thumbnailSrc
      thumbnailCropper
      showDescriptionPage
      showThumbnailPage
      hide
      createdAt
      updatedAt
    }
  }
`;
export const deleteMenu = /* GraphQL */ `
  mutation DeleteMenu(
    $input: DeleteMenuInput!
    $condition: ModelMenuConditionInput
  ) {
    deleteMenu(input: $input, condition: $condition) {
      id
      alias
      order
      title
      description
      orderDesc
      thumbnail
      thumbnailSrc
      thumbnailCropper
      showDescriptionPage
      showThumbnailPage
      hide
      createdAt
      updatedAt
    }
  }
`;
export const updatePage = /* GraphQL */ `
  mutation UpdatePage(
    $input: UpdatePageInput!
    $condition: ModelPageConditionInput
  ) {
    updatePage(input: $input, condition: $condition) {
      id
      alias
      status
      type
      menu
      menuProps {
        id
        alias
        order
        title
        description
        orderDesc
        thumbnail
        thumbnailSrc
        thumbnailCropper
        showDescriptionPage
        showThumbnailPage
        hide
        createdAt
        updatedAt
      }
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
      blocks {
        nextToken
      }
      updatedAt
    }
  }
`;
export const deletePage = /* GraphQL */ `
  mutation DeletePage(
    $input: DeletePageInput!
    $condition: ModelPageConditionInput
  ) {
    deletePage(input: $input, condition: $condition) {
      id
      alias
      status
      type
      menu
      menuProps {
        id
        alias
        order
        title
        description
        orderDesc
        thumbnail
        thumbnailSrc
        thumbnailCropper
        showDescriptionPage
        showThumbnailPage
        hide
        createdAt
        updatedAt
      }
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
      blocks {
        nextToken
      }
      updatedAt
    }
  }
`;
export const createBlock = /* GraphQL */ `
  mutation CreateBlock(
    $input: CreateBlockInput!
    $condition: ModelBlockConditionInput
  ) {
    createBlock(input: $input, condition: $condition) {
      id
      pageID
      order
      component
      content
      config
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
export const updateBlock = /* GraphQL */ `
  mutation UpdateBlock(
    $input: UpdateBlockInput!
    $condition: ModelBlockConditionInput
  ) {
    updateBlock(input: $input, condition: $condition) {
      id
      pageID
      order
      component
      content
      config
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
export const deleteBlock = /* GraphQL */ `
  mutation DeleteBlock(
    $input: DeleteBlockInput!
    $condition: ModelBlockConditionInput
  ) {
    deleteBlock(input: $input, condition: $condition) {
      id
      pageID
      order
      component
      content
      config
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
export const createCategory = /* GraphQL */ `
  mutation CreateCategory(
    $input: CreateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    createCategory(input: $input, condition: $condition) {
      id
      alias
      order
      title
      description
      thumbnail
      thumbnailSrc
      thumbnailCropper
      hide
      isSub
      createdAt
      updatedAt
    }
  }
`;
export const updateCategory = /* GraphQL */ `
  mutation UpdateCategory(
    $input: UpdateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    updateCategory(input: $input, condition: $condition) {
      id
      alias
      order
      title
      description
      thumbnail
      thumbnailSrc
      thumbnailCropper
      hide
      isSub
      createdAt
      updatedAt
    }
  }
`;
export const deleteCategory = /* GraphQL */ `
  mutation DeleteCategory(
    $input: DeleteCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    deleteCategory(input: $input, condition: $condition) {
      id
      alias
      order
      title
      description
      thumbnail
      thumbnailSrc
      thumbnailCropper
      hide
      isSub
      createdAt
      updatedAt
    }
  }
`;
export const createProduct = /* GraphQL */ `
  mutation CreateProduct(
    $input: CreateProductInput!
    $condition: ModelProductConditionInput
  ) {
    createProduct(input: $input, condition: $condition) {
      id
      alias
      status
      category
      categoryProps {
        id
        alias
        order
        title
        description
        thumbnail
        thumbnailSrc
        thumbnailCropper
        hide
        isSub
        createdAt
        updatedAt
      }
      subCategory
      subCategoryProps {
        id
        alias
        order
        title
        description
        thumbnail
        thumbnailSrc
        thumbnailCropper
        hide
        isSub
        createdAt
        updatedAt
      }
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
      options {
        nextToken
      }
      updatedAt
    }
  }
`;
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
      id
      alias
      status
      category
      categoryProps {
        id
        alias
        order
        title
        description
        thumbnail
        thumbnailSrc
        thumbnailCropper
        hide
        isSub
        createdAt
        updatedAt
      }
      subCategory
      subCategoryProps {
        id
        alias
        order
        title
        description
        thumbnail
        thumbnailSrc
        thumbnailCropper
        hide
        isSub
        createdAt
        updatedAt
      }
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
      options {
        nextToken
      }
      updatedAt
    }
  }
`;
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
      id
      alias
      status
      category
      categoryProps {
        id
        alias
        order
        title
        description
        thumbnail
        thumbnailSrc
        thumbnailCropper
        hide
        isSub
        createdAt
        updatedAt
      }
      subCategory
      subCategoryProps {
        id
        alias
        order
        title
        description
        thumbnail
        thumbnailSrc
        thumbnailCropper
        hide
        isSub
        createdAt
        updatedAt
      }
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
      options {
        nextToken
      }
      updatedAt
    }
  }
`;
export const createOption = /* GraphQL */ `
  mutation CreateOption(
    $input: CreateOptionInput!
    $condition: ModelOptionConditionInput
  ) {
    createOption(input: $input, condition: $condition) {
      id
      productID
      name
      price
      createdAt
      updatedAt
    }
  }
`;
export const updateOption = /* GraphQL */ `
  mutation UpdateOption(
    $input: UpdateOptionInput!
    $condition: ModelOptionConditionInput
  ) {
    updateOption(input: $input, condition: $condition) {
      id
      productID
      name
      price
      createdAt
      updatedAt
    }
  }
`;
export const deleteOption = /* GraphQL */ `
  mutation DeleteOption(
    $input: DeleteOptionInput!
    $condition: ModelOptionConditionInput
  ) {
    deleteOption(input: $input, condition: $condition) {
      id
      productID
      name
      price
      createdAt
      updatedAt
    }
  }
`;
export const deleteCart = /* GraphQL */ `
  mutation DeleteCart(
    $input: DeleteCartInput!
    $condition: ModelCartConditionInput
  ) {
    deleteCart(input: $input, condition: $condition) {
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
export const deleteCartOption = /* GraphQL */ `
  mutation DeleteCartOption(
    $input: DeleteCartOptionInput!
    $condition: ModelCartOptionConditionInput
  ) {
    deleteCartOption(input: $input, condition: $condition) {
      id
      cartID
      optionID
      option {
        id
        productID
        name
        price
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      userID
    }
  }
`;
export const deleteOrder = /* GraphQL */ `
  mutation DeleteOrder(
    $input: DeleteOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    deleteOrder(input: $input, condition: $condition) {
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
export const createCoupon = /* GraphQL */ `
  mutation CreateCoupon(
    $input: CreateCouponInput!
    $condition: ModelCouponConditionInput
  ) {
    createCoupon(input: $input, condition: $condition) {
      id
      name
      description
      code
      start
      expiration
      discountPercentage
      discountValue
      qtyLimit
      qtyUsed
      qtyProduct
      qtyProductUsed
      search
      products {
        nextToken
      }
      couponUsed {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteCoupon = /* GraphQL */ `
  mutation DeleteCoupon(
    $input: DeleteCouponInput!
    $condition: ModelCouponConditionInput
  ) {
    deleteCoupon(input: $input, condition: $condition) {
      id
      name
      description
      code
      start
      expiration
      discountPercentage
      discountValue
      qtyLimit
      qtyUsed
      qtyProduct
      qtyProductUsed
      search
      products {
        nextToken
      }
      couponUsed {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createDeliveryMethodOrder = /* GraphQL */ `
  mutation CreateDeliveryMethodOrder(
    $input: CreateDeliveryMethodOrderInput!
    $condition: ModelDeliveryMethodOrderConditionInput
  ) {
    createDeliveryMethodOrder(input: $input, condition: $condition) {
      id
      name
      zipCode
      price
      time
      createdAt
      updatedAt
    }
  }
`;
export const updateDeliveryMethodOrder = /* GraphQL */ `
  mutation UpdateDeliveryMethodOrder(
    $input: UpdateDeliveryMethodOrderInput!
    $condition: ModelDeliveryMethodOrderConditionInput
  ) {
    updateDeliveryMethodOrder(input: $input, condition: $condition) {
      id
      name
      zipCode
      price
      time
      createdAt
      updatedAt
    }
  }
`;
export const deleteDeliveryMethodOrder = /* GraphQL */ `
  mutation DeleteDeliveryMethodOrder(
    $input: DeleteDeliveryMethodOrderInput!
    $condition: ModelDeliveryMethodOrderConditionInput
  ) {
    deleteDeliveryMethodOrder(input: $input, condition: $condition) {
      id
      name
      zipCode
      price
      time
      createdAt
      updatedAt
    }
  }
`;
export const createQrCodeScan = /* GraphQL */ `
  mutation CreateQrCodeScan(
    $input: CreateQrCodeScanInput!
    $condition: ModelQrCodeScanConditionInput
  ) {
    createQrCodeScan(input: $input, condition: $condition) {
      id
      userID
      relationID
      uuid
      createdAt
      updatedAt
    }
  }
`;
export const createQuiz = /* GraphQL */ `
  mutation CreateQuiz(
    $input: CreateQuizInput!
    $condition: ModelQuizConditionInput
  ) {
    createQuiz(input: $input, condition: $condition) {
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
export const updateQuiz = /* GraphQL */ `
  mutation UpdateQuiz(
    $input: UpdateQuizInput!
    $condition: ModelQuizConditionInput
  ) {
    updateQuiz(input: $input, condition: $condition) {
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
export const deleteQuiz = /* GraphQL */ `
  mutation DeleteQuiz(
    $input: DeleteQuizInput!
    $condition: ModelQuizConditionInput
  ) {
    deleteQuiz(input: $input, condition: $condition) {
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
export const createQuizQuestion = /* GraphQL */ `
  mutation CreateQuizQuestion(
    $input: CreateQuizQuestionInput!
    $condition: ModelQuizQuestionConditionInput
  ) {
    createQuizQuestion(input: $input, condition: $condition) {
      id
      quizID
      question
      image
      alternativeA
      alternativeB
      alternativeC
      alternativeD
      alternativeE
      alternativeCorrect
      order
      search
      createdAt
      updatedAt
    }
  }
`;
export const updateQuizQuestion = /* GraphQL */ `
  mutation UpdateQuizQuestion(
    $input: UpdateQuizQuestionInput!
    $condition: ModelQuizQuestionConditionInput
  ) {
    updateQuizQuestion(input: $input, condition: $condition) {
      id
      quizID
      question
      image
      alternativeA
      alternativeB
      alternativeC
      alternativeD
      alternativeE
      alternativeCorrect
      order
      search
      createdAt
      updatedAt
    }
  }
`;
export const deleteQuizQuestion = /* GraphQL */ `
  mutation DeleteQuizQuestion(
    $input: DeleteQuizQuestionInput!
    $condition: ModelQuizQuestionConditionInput
  ) {
    deleteQuizQuestion(input: $input, condition: $condition) {
      id
      quizID
      question
      image
      alternativeA
      alternativeB
      alternativeC
      alternativeD
      alternativeE
      alternativeCorrect
      order
      search
      createdAt
      updatedAt
    }
  }
`;
export const createVideoObject = /* GraphQL */ `
  mutation CreateVideoObject(
    $input: CreateVideoObjectInput!
    $condition: ModelVideoObjectConditionInput
  ) {
    createVideoObject(input: $input, condition: $condition) {
      id
      token
      createdAt
      updatedAt
    }
  }
`;
export const updateVideoObject = /* GraphQL */ `
  mutation UpdateVideoObject(
    $input: UpdateVideoObjectInput!
    $condition: ModelVideoObjectConditionInput
  ) {
    updateVideoObject(input: $input, condition: $condition) {
      id
      token
      createdAt
      updatedAt
    }
  }
`;
export const deleteVideoObject = /* GraphQL */ `
  mutation DeleteVideoObject(
    $input: DeleteVideoObjectInput!
    $condition: ModelVideoObjectConditionInput
  ) {
    deleteVideoObject(input: $input, condition: $condition) {
      id
      token
      createdAt
      updatedAt
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      name
      email
      phone
      status
      active
      avatar
      search
      createdAt
      profile {
        userID
        doc
        docType
        docProfession
        profession
        specialties
        subSpecialties
        bio
        gender
        birth
        birthDay
        notes
        urlUserName
        urlEnable
        allowViewEmail
        allowViewPhone
        allowCookiesPreference
        allowCookiesStatistic
        pix
        zipCodeCoverage
        schedulesSunday
        schedulesMonday
        schedulesTuesday
        schedulesWednesday
        schedulesThursday
        schedulesFriday
        schedulesSaturday
        customerPagarmeID
        uuid
        createdAt
        updatedAt
      }
      groups {
        nextToken
      }
      logs {
        nextToken
      }
      addresses {
        nextToken
      }
      payMethods {
        nextToken
      }
      relationsLink {
        nextToken
      }
      carts {
        nextToken
      }
      ordersByCreatedAt {
        nextToken
      }
      ordersByStatusCreatedAt {
        nextToken
      }
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      name
      email
      phone
      status
      active
      avatar
      search
      createdAt
      profile {
        userID
        doc
        docType
        docProfession
        profession
        specialties
        subSpecialties
        bio
        gender
        birth
        birthDay
        notes
        urlUserName
        urlEnable
        allowViewEmail
        allowViewPhone
        allowCookiesPreference
        allowCookiesStatistic
        pix
        zipCodeCoverage
        schedulesSunday
        schedulesMonday
        schedulesTuesday
        schedulesWednesday
        schedulesThursday
        schedulesFriday
        schedulesSaturday
        customerPagarmeID
        uuid
        createdAt
        updatedAt
      }
      groups {
        nextToken
      }
      logs {
        nextToken
      }
      addresses {
        nextToken
      }
      payMethods {
        nextToken
      }
      relationsLink {
        nextToken
      }
      carts {
        nextToken
      }
      ordersByCreatedAt {
        nextToken
      }
      ordersByStatusCreatedAt {
        nextToken
      }
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      name
      email
      phone
      status
      active
      avatar
      search
      createdAt
      profile {
        userID
        doc
        docType
        docProfession
        profession
        specialties
        subSpecialties
        bio
        gender
        birth
        birthDay
        notes
        urlUserName
        urlEnable
        allowViewEmail
        allowViewPhone
        allowCookiesPreference
        allowCookiesStatistic
        pix
        zipCodeCoverage
        schedulesSunday
        schedulesMonday
        schedulesTuesday
        schedulesWednesday
        schedulesThursday
        schedulesFriday
        schedulesSaturday
        customerPagarmeID
        uuid
        createdAt
        updatedAt
      }
      groups {
        nextToken
      }
      logs {
        nextToken
      }
      addresses {
        nextToken
      }
      payMethods {
        nextToken
      }
      relationsLink {
        nextToken
      }
      carts {
        nextToken
      }
      ordersByCreatedAt {
        nextToken
      }
      ordersByStatusCreatedAt {
        nextToken
      }
      updatedAt
    }
  }
`;
export const createProfile = /* GraphQL */ `
  mutation CreateProfile(
    $input: CreateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    createProfile(input: $input, condition: $condition) {
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
      doc
      docType
      docProfession
      profession
      specialties
      subSpecialties
      bio
      gender
      birth
      birthDay
      notes
      urlUserName
      urlEnable
      allowViewEmail
      allowViewPhone
      allowCookiesPreference
      allowCookiesStatistic
      pix
      zipCodeCoverage
      schedulesSunday
      schedulesMonday
      schedulesTuesday
      schedulesWednesday
      schedulesThursday
      schedulesFriday
      schedulesSaturday
      customerPagarmeID
      uuid
      createdAt
      updatedAt
    }
  }
`;
export const updateProfile = /* GraphQL */ `
  mutation UpdateProfile(
    $input: UpdateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    updateProfile(input: $input, condition: $condition) {
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
      doc
      docType
      docProfession
      profession
      specialties
      subSpecialties
      bio
      gender
      birth
      birthDay
      notes
      urlUserName
      urlEnable
      allowViewEmail
      allowViewPhone
      allowCookiesPreference
      allowCookiesStatistic
      pix
      zipCodeCoverage
      schedulesSunday
      schedulesMonday
      schedulesTuesday
      schedulesWednesday
      schedulesThursday
      schedulesFriday
      schedulesSaturday
      customerPagarmeID
      uuid
      createdAt
      updatedAt
    }
  }
`;
export const deleteProfile = /* GraphQL */ `
  mutation DeleteProfile(
    $input: DeleteProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    deleteProfile(input: $input, condition: $condition) {
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
      doc
      docType
      docProfession
      profession
      specialties
      subSpecialties
      bio
      gender
      birth
      birthDay
      notes
      urlUserName
      urlEnable
      allowViewEmail
      allowViewPhone
      allowCookiesPreference
      allowCookiesStatistic
      pix
      zipCodeCoverage
      schedulesSunday
      schedulesMonday
      schedulesTuesday
      schedulesWednesday
      schedulesThursday
      schedulesFriday
      schedulesSaturday
      customerPagarmeID
      uuid
      createdAt
      updatedAt
    }
  }
`;
export const createAddress = /* GraphQL */ `
  mutation CreateAddress(
    $input: CreateAddressInput!
    $condition: ModelAddressConditionInput
  ) {
    createAddress(input: $input, condition: $condition) {
      id
      userID
      name
      reference
      street
      number
      complement
      zipcode
      neighborhood
      city
      state
      country
      addressPagarmeID
      createdAt
      updatedAt
    }
  }
`;
export const updateAddress = /* GraphQL */ `
  mutation UpdateAddress(
    $input: UpdateAddressInput!
    $condition: ModelAddressConditionInput
  ) {
    updateAddress(input: $input, condition: $condition) {
      id
      userID
      name
      reference
      street
      number
      complement
      zipcode
      neighborhood
      city
      state
      country
      addressPagarmeID
      createdAt
      updatedAt
    }
  }
`;
export const createPayMethod = /* GraphQL */ `
  mutation CreatePayMethod(
    $input: CreatePayMethodInput!
    $condition: ModelPayMethodConditionInput
  ) {
    createPayMethod(input: $input, condition: $condition) {
      id
      userID
      method
      number
      holderName
      holderDocument
      expMonth
      expYear
      cvv
      brand
      label
      cardPagarmeID
      createdAt
      updatedAt
    }
  }
`;
export const updatePayMethod = /* GraphQL */ `
  mutation UpdatePayMethod(
    $input: UpdatePayMethodInput!
    $condition: ModelPayMethodConditionInput
  ) {
    updatePayMethod(input: $input, condition: $condition) {
      id
      userID
      method
      number
      holderName
      holderDocument
      expMonth
      expYear
      cvv
      brand
      label
      cardPagarmeID
      createdAt
      updatedAt
    }
  }
`;
export const createLog = /* GraphQL */ `
  mutation CreateLog(
    $input: CreateLogInput!
    $condition: ModelLogConditionInput
  ) {
    createLog(input: $input, condition: $condition) {
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
export const updateInvite = /* GraphQL */ `
  mutation UpdateInvite(
    $input: UpdateInviteInput!
    $condition: ModelInviteConditionInput
  ) {
    updateInvite(input: $input, condition: $condition) {
      id
      name
      description
      email
      phone
      groups
      status
      createdAt
      updatedAt
    }
  }
`;
export const createDataBase = /* GraphQL */ `
  mutation CreateDataBase(
    $input: CreateDataBaseInput!
    $condition: ModelDataBaseConditionInput
  ) {
    createDataBase(input: $input, condition: $condition) {
      id
      name
      items {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createDataBaseItem = /* GraphQL */ `
  mutation CreateDataBaseItem(
    $input: CreateDataBaseItemInput!
    $condition: ModelDataBaseItemConditionInput
  ) {
    createDataBaseItem(input: $input, condition: $condition) {
      id
      dataBaseID
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
      data
      status
      search
      notes
      createdAt
      updatedAt
    }
  }
`;
export const createFavorite = /* GraphQL */ `
  mutation CreateFavorite(
    $input: CreateFavoriteInput!
    $condition: ModelFavoriteConditionInput
  ) {
    createFavorite(input: $input, condition: $condition) {
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
export const updateFavorite = /* GraphQL */ `
  mutation UpdateFavorite(
    $input: UpdateFavoriteInput!
    $condition: ModelFavoriteConditionInput
  ) {
    updateFavorite(input: $input, condition: $condition) {
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
export const deleteFavorite = /* GraphQL */ `
  mutation DeleteFavorite(
    $input: DeleteFavoriteInput!
    $condition: ModelFavoriteConditionInput
  ) {
    deleteFavorite(input: $input, condition: $condition) {
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
export const createRelation = /* GraphQL */ `
  mutation CreateRelation(
    $input: CreateRelationInput!
    $condition: ModelRelationConditionInput
  ) {
    createRelation(input: $input, condition: $condition) {
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
      relationsLink {
        nextToken
      }
      messages {
        nextToken
      }
      schedules {
        nextToken
      }
      documents {
        nextToken
      }
      restrictedContents {
        nextToken
      }
      createdAt
    }
  }
`;
export const updateRelation = /* GraphQL */ `
  mutation UpdateRelation(
    $input: UpdateRelationInput!
    $condition: ModelRelationConditionInput
  ) {
    updateRelation(input: $input, condition: $condition) {
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
      relationsLink {
        nextToken
      }
      messages {
        nextToken
      }
      schedules {
        nextToken
      }
      documents {
        nextToken
      }
      restrictedContents {
        nextToken
      }
      createdAt
    }
  }
`;
export const deleteRelation = /* GraphQL */ `
  mutation DeleteRelation(
    $input: DeleteRelationInput!
    $condition: ModelRelationConditionInput
  ) {
    deleteRelation(input: $input, condition: $condition) {
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
      relationsLink {
        nextToken
      }
      messages {
        nextToken
      }
      schedules {
        nextToken
      }
      documents {
        nextToken
      }
      restrictedContents {
        nextToken
      }
      createdAt
    }
  }
`;
export const createRelationLink = /* GraphQL */ `
  mutation CreateRelationLink(
    $input: CreateRelationLinkInput!
    $condition: ModelRelationLinkConditionInput
  ) {
    createRelationLink(input: $input, condition: $condition) {
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
export const updateRelationLink = /* GraphQL */ `
  mutation UpdateRelationLink(
    $input: UpdateRelationLinkInput!
    $condition: ModelRelationLinkConditionInput
  ) {
    updateRelationLink(input: $input, condition: $condition) {
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
export const deleteRelationLink = /* GraphQL */ `
  mutation DeleteRelationLink(
    $input: DeleteRelationLinkInput!
    $condition: ModelRelationLinkConditionInput
  ) {
    deleteRelationLink(input: $input, condition: $condition) {
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
export const createNotify = /* GraphQL */ `
  mutation CreateNotify(
    $input: CreateNotifyInput!
    $condition: ModelNotifyConditionInput
  ) {
    createNotify(input: $input, condition: $condition) {
      id
      userID
      date
      content
      link
      viewed
      createdAt
      updatedAt
    }
  }
`;
export const deleteNotify = /* GraphQL */ `
  mutation DeleteNotify(
    $input: DeleteNotifyInput!
    $condition: ModelNotifyConditionInput
  ) {
    deleteNotify(input: $input, condition: $condition) {
      id
      userID
      date
      content
      link
      viewed
      createdAt
      updatedAt
    }
  }
`;
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
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
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
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
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
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
export const createSchedule = /* GraphQL */ `
  mutation CreateSchedule(
    $input: CreateScheduleInput!
    $condition: ModelScheduleConditionInput
  ) {
    createSchedule(input: $input, condition: $condition) {
      id
      relationID
      userID
      dateTime
      title
      description
      link
      frequency
      createdAt
      viewType
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
      updatedAt
    }
  }
`;
export const updateSchedule = /* GraphQL */ `
  mutation UpdateSchedule(
    $input: UpdateScheduleInput!
    $condition: ModelScheduleConditionInput
  ) {
    updateSchedule(input: $input, condition: $condition) {
      id
      relationID
      userID
      dateTime
      title
      description
      link
      frequency
      createdAt
      viewType
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
      updatedAt
    }
  }
`;
export const deleteSchedule = /* GraphQL */ `
  mutation DeleteSchedule(
    $input: DeleteScheduleInput!
    $condition: ModelScheduleConditionInput
  ) {
    deleteSchedule(input: $input, condition: $condition) {
      id
      relationID
      userID
      dateTime
      title
      description
      link
      frequency
      createdAt
      viewType
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
      updatedAt
    }
  }
`;
export const createDocument = /* GraphQL */ `
  mutation CreateDocument(
    $input: CreateDocumentInput!
    $condition: ModelDocumentConditionInput
  ) {
    createDocument(input: $input, condition: $condition) {
      id
      relationID
      ownerID
      title
      description
      notes
      conclusion
      content
      fileKey
      identityId
      createdAt
      updatedAt
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
      owner {
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
    }
  }
`;
export const updateDocument = /* GraphQL */ `
  mutation UpdateDocument(
    $input: UpdateDocumentInput!
    $condition: ModelDocumentConditionInput
  ) {
    updateDocument(input: $input, condition: $condition) {
      id
      relationID
      ownerID
      title
      description
      notes
      conclusion
      content
      fileKey
      identityId
      createdAt
      updatedAt
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
      owner {
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
    }
  }
`;
export const createRestrictedContentView = /* GraphQL */ `
  mutation CreateRestrictedContentView(
    $input: CreateRestrictedContentViewInput!
    $condition: ModelRestrictedContentViewConditionInput
  ) {
    createRestrictedContentView(input: $input, condition: $condition) {
      id
      restrictedContentID
      userID
      percentage
      rating
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
      createdAt
      updatedAt
    }
  }
`;
export const updateRestrictedContentView = /* GraphQL */ `
  mutation UpdateRestrictedContentView(
    $input: UpdateRestrictedContentViewInput!
    $condition: ModelRestrictedContentViewConditionInput
  ) {
    updateRestrictedContentView(input: $input, condition: $condition) {
      id
      restrictedContentID
      userID
      percentage
      rating
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
      createdAt
      updatedAt
    }
  }
`;
export const createPage = /* GraphQL */ `
  mutation CreatePage(
    $input: CreatePageInput!
    $condition: ModelPageConditionInput
  ) {
    createPage(input: $input, condition: $condition) {
      id
      alias
      status
      type
      menu
      menuProps {
        id
        alias
        order
        title
        description
        orderDesc
        thumbnail
        thumbnailSrc
        thumbnailCropper
        showDescriptionPage
        showThumbnailPage
        hide
        createdAt
        updatedAt
      }
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
      blocks {
        nextToken
      }
      updatedAt
    }
  }
`;
export const createCart = /* GraphQL */ `
  mutation CreateCart(
    $input: CreateCartInput!
    $condition: ModelCartConditionInput
  ) {
    createCart(input: $input, condition: $condition) {
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
export const updateCart = /* GraphQL */ `
  mutation UpdateCart(
    $input: UpdateCartInput!
    $condition: ModelCartConditionInput
  ) {
    updateCart(input: $input, condition: $condition) {
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
export const createCartOption = /* GraphQL */ `
  mutation CreateCartOption(
    $input: CreateCartOptionInput!
    $condition: ModelCartOptionConditionInput
  ) {
    createCartOption(input: $input, condition: $condition) {
      id
      cartID
      optionID
      option {
        id
        productID
        name
        price
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      userID
    }
  }
`;
export const updateCartOption = /* GraphQL */ `
  mutation UpdateCartOption(
    $input: UpdateCartOptionInput!
    $condition: ModelCartOptionConditionInput
  ) {
    updateCartOption(input: $input, condition: $condition) {
      id
      cartID
      optionID
      option {
        id
        productID
        name
        price
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      userID
    }
  }
`;
export const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
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
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
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
export const createOrderItem = /* GraphQL */ `
  mutation CreateOrderItem(
    $input: CreateOrderItemInput!
    $condition: ModelOrderItemConditionInput
  ) {
    createOrderItem(input: $input, condition: $condition) {
      id
      orderID
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
      optionsItem {
        nextToken
      }
      qty
      code
      name
      description
      price
      photo1
      changeName
      changeDescription
      changeQtyBlend
      changePriceAdjustment
      blendID
      changeNameAdmin
      createdAt
      updatedAt
    }
  }
`;
export const updateOrderItem = /* GraphQL */ `
  mutation UpdateOrderItem(
    $input: UpdateOrderItemInput!
    $condition: ModelOrderItemConditionInput
  ) {
    updateOrderItem(input: $input, condition: $condition) {
      id
      orderID
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
      optionsItem {
        nextToken
      }
      qty
      code
      name
      description
      price
      photo1
      changeName
      changeDescription
      changeQtyBlend
      changePriceAdjustment
      blendID
      changeNameAdmin
      createdAt
      updatedAt
    }
  }
`;
export const deleteOrderItem = /* GraphQL */ `
  mutation DeleteOrderItem(
    $input: DeleteOrderItemInput!
    $condition: ModelOrderItemConditionInput
  ) {
    deleteOrderItem(input: $input, condition: $condition) {
      id
      orderID
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
      optionsItem {
        nextToken
      }
      qty
      code
      name
      description
      price
      photo1
      changeName
      changeDescription
      changeQtyBlend
      changePriceAdjustment
      blendID
      changeNameAdmin
      createdAt
      updatedAt
    }
  }
`;
export const createOrderItemOption = /* GraphQL */ `
  mutation CreateOrderItemOption(
    $input: CreateOrderItemOptionInput!
    $condition: ModelOrderItemOptionConditionInput
  ) {
    createOrderItemOption(input: $input, condition: $condition) {
      id
      orderItemID
      optionID
      option {
        id
        productID
        name
        price
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateOrderItemOption = /* GraphQL */ `
  mutation UpdateOrderItemOption(
    $input: UpdateOrderItemOptionInput!
    $condition: ModelOrderItemOptionConditionInput
  ) {
    updateOrderItemOption(input: $input, condition: $condition) {
      id
      orderItemID
      optionID
      option {
        id
        productID
        name
        price
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteOrderItemOption = /* GraphQL */ `
  mutation DeleteOrderItemOption(
    $input: DeleteOrderItemOptionInput!
    $condition: ModelOrderItemOptionConditionInput
  ) {
    deleteOrderItemOption(input: $input, condition: $condition) {
      id
      orderItemID
      optionID
      option {
        id
        productID
        name
        price
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateCoupon = /* GraphQL */ `
  mutation UpdateCoupon(
    $input: UpdateCouponInput!
    $condition: ModelCouponConditionInput
  ) {
    updateCoupon(input: $input, condition: $condition) {
      id
      name
      description
      code
      start
      expiration
      discountPercentage
      discountValue
      qtyLimit
      qtyUsed
      qtyProduct
      qtyProductUsed
      search
      products {
        nextToken
      }
      couponUsed {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createCouponProduct = /* GraphQL */ `
  mutation CreateCouponProduct(
    $input: CreateCouponProductInput!
    $condition: ModelCouponProductConditionInput
  ) {
    createCouponProduct(input: $input, condition: $condition) {
      id
      couponID
      productID
      price
      limit
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
      createdAt
      updatedAt
    }
  }
`;
export const updateCouponProduct = /* GraphQL */ `
  mutation UpdateCouponProduct(
    $input: UpdateCouponProductInput!
    $condition: ModelCouponProductConditionInput
  ) {
    updateCouponProduct(input: $input, condition: $condition) {
      id
      couponID
      productID
      price
      limit
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
      createdAt
      updatedAt
    }
  }
`;
export const deleteCouponProduct = /* GraphQL */ `
  mutation DeleteCouponProduct(
    $input: DeleteCouponProductInput!
    $condition: ModelCouponProductConditionInput
  ) {
    deleteCouponProduct(input: $input, condition: $condition) {
      id
      couponID
      productID
      price
      limit
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
      createdAt
      updatedAt
    }
  }
`;
export const createCouponUsed = /* GraphQL */ `
  mutation CreateCouponUsed(
    $input: CreateCouponUsedInput!
    $condition: ModelCouponUsedConditionInput
  ) {
    createCouponUsed(input: $input, condition: $condition) {
      id
      couponID
      coupon {
        id
        name
        description
        code
        start
        expiration
        discountPercentage
        discountValue
        qtyLimit
        qtyUsed
        qtyProduct
        qtyProductUsed
        search
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
      qty
      createdAt
      updatedAt
    }
  }
`;
export const createDeliveryOrder = /* GraphQL */ `
  mutation CreateDeliveryOrder(
    $input: CreateDeliveryOrderInput!
    $condition: ModelDeliveryOrderConditionInput
  ) {
    createDeliveryOrder(input: $input, condition: $condition) {
      id
      orderID
      order {
        id
        userID
        status
        createdAt
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
      date
      deliveryUserID
      deliveryUser {
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
      updatedAt
    }
  }
`;
export const updateDeliveryOrder = /* GraphQL */ `
  mutation UpdateDeliveryOrder(
    $input: UpdateDeliveryOrderInput!
    $condition: ModelDeliveryOrderConditionInput
  ) {
    updateDeliveryOrder(input: $input, condition: $condition) {
      id
      orderID
      order {
        id
        userID
        status
        createdAt
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
      date
      deliveryUserID
      deliveryUser {
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
      updatedAt
    }
  }
`;
export const deleteDeliveryOrder = /* GraphQL */ `
  mutation DeleteDeliveryOrder(
    $input: DeleteDeliveryOrderInput!
    $condition: ModelDeliveryOrderConditionInput
  ) {
    deleteDeliveryOrder(input: $input, condition: $condition) {
      id
      orderID
      order {
        id
        userID
        status
        createdAt
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
      date
      deliveryUserID
      deliveryUser {
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
      updatedAt
    }
  }
`;
