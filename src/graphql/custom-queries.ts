export const getUserCustom = /* GraphQL */ `
  query GetUserCustom($id: ID!) {
    getUser(id: $id) {
      id
      name
      email
      phone
      status
      active
      avatar
      profile {
        doc
        docType
        allowViewEmail
        allowViewPhone
        customerPagarmeID
        uuid
      }
      groups {
        items {
          group
        }
      }
    }
  }
`
export const listRelationsByTypeUpdatedAtCustom = /* GraphQL */ `
  query ListRelationsByTypeUpdatedAtCustom(
    $type: String!
    $updatedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRelationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRelationsByTypeUpdatedAt(
      type: $type
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        createdAt
        relationsLink {
          items {
            id
          }
          nextToken
        }
        messages {
          nextToken
        }
      }
      nextToken
    }
  }
`
export const listRelationsByTypeModeUpdatedAtCustom = /* GraphQL */ `
  query ListRelationsByTypeModeUpdatedAtCustom(
    $type: String!
    $modeUpdatedAt: ModelRelationRelationsByTypeModeUpdatedAtCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRelationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRelationsByTypeModeUpdatedAt(
      type: $type
      modeUpdatedAt: $modeUpdatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        createdAt
        relationsLink {
          nextToken
        }
        messages {
          nextToken
        }
        documents {
          nextToken
        }
      }
      nextToken
    }
  }
`
export const getRelationCustom = /* GraphQL */ `
  query GetRelationCustom($id: ID!) {
    getRelation(id: $id) {
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
      createdAt
    }
  }
`
export const listRelationsByTypeStatusUpdatedAtCustom = /* GraphQL */ `
  query ListRelationsByTypeStatusUpdatedAtCustom(
    $type: String!
    $statusUpdatedAt: ModelRelationRelationsByTypeStatusUpdatedAtCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRelationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRelationsByTypeStatusUpdatedAt(
      type: $type
      statusUpdatedAt: $statusUpdatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        createdAt
        messages {
          items {
            content
            createdAt
            id
            type
            userID
            user {
              id
              email
              name
              phone
            }
          }
          nextToken
        }
        documents {
          items {
            conclusion
            content
            description
            fileKey
            id
            identityId
            notes
            ownerID
            relationID
            title
            createdAt
            owner {
              id
              email
              name
              phone
            }
          }
        }
        relationsLink {
          items {
            id
          }
        }
      }
      nextToken
    }
  }
`
export const listLogsCustom = /* GraphQL */ `
  query ListLogsCustom(
    $id: ID
    $filter: ModelLogFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listLogs(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        userID
        tag
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
        updatedAt
        user {
          name
          email
          phone
          active
          avatar
        }
      }
      nextToken
    }
  }
`
export const listLogsByTagCreatedAtCustom = /* GraphQL */ `
  query ListLogsByTagCreatedAtCustom(
    $tag: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelLogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLogsByTagCreatedAt(
      tag: $tag
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        tag
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
        updatedAt
        user {
          name
          email
          phone
          active
          avatar
        }
      }
      nextToken
    }
  }
`
export const listLogsBySourceCreatedAtCustom = /* GraphQL */ `
  query ListLogsBySourceCreatedAtCustom(
    $source: LogSource!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelLogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLogsBySourceCreatedAt(
      source: $source
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        updatedAt
        user {
          name
          email
          phone
          active
          avatar
        }
      }
      nextToken
    }
  }
`
export const listLogsByUserTagCreatedAtCustom = /* GraphQL */ `
  query ListLogsByUserTagCreatedAtCustom(
    $userID: ID!
    $tagCreatedAt: ModelLogLogsByUserTagCreatedAtCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelLogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLogsByUserTagCreatedAt(
      userID: $userID
      tagCreatedAt: $tagCreatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        tag
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
        updatedAt
        user {
          name
          email
          phone
          active
          avatar
        }
      }
      nextToken
    }
  }
`
export const listLogsByUserCreatedAtCustom = /* GraphQL */ `
  query ListLogsByUserCreatedAtCustom(
    $userID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelLogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLogsByUserCreatedAt(
      userID: $userID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        tag
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
        updatedAt
        user {
          name
          email
          phone
          active
          avatar
        }
      }
      nextToken
    }
  }
`
export const getPageCustom = /* GraphQL */ `
  query GetPageCustom($id: ID!) {
    getPage(id: $id) {
      id
      alias
      status
      type
      menu
      order
      title
      description
      content
      contentPadX
      contentPadY
      tags
      thumbnail
      changeFreq
      priority
      optionTitle
      titlePadX
      titlePadY
      sideColumn
      sideColumnPadX
      sideColumnPadY
      sideColumnContent
      optionSideColumn
      footerSm
      footerLg
      hideInMenu
      createdAt
      updatedAt
      blocks {
        items {
          id
          component
          config
          content
          order
        }
      }
    }
  }
`
export const listPagesByAliasCreatedAtCustom = /* GraphQL */ `
  query ListPagesByAliasCreatedAtCustom(
    $alias: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPagesByAliasCreatedAt(
      alias: $alias
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        alias
        status
        type
        menu
        menuProps {
          orderDesc
          showThumbnailPage
          showDescriptionPage
        }
        order
        title
        description
        content
        contentPadX
        contentPadY
        tags
        thumbnail
        changeFreq
        priority
        optionTitle
        titlePadX
        titlePadY
        sideColumn
        sideColumnPadX
        sideColumnPadY
        sideColumnContent
        optionSideColumn
        footerSm
        footerLg
        hideInMenu
        createdAt
        updatedAt
        blocks {
          items {
            id
            component
            config
            content
            order
          }
        }
      }
      nextToken
    }
  }
`
export const listPagesByStatusMenuOrderCustom = /* GraphQL */ `
  query ListPagesByStatusMenuOrderCustom(
    $status: PageStatus!
    $menuOrder: ModelPagePagesByStatusMenuOrderCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPagesByStatusMenuOrder(
      status: $status
      menuOrder: $menuOrder
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        alias
        title
        description
        thumbnail
        hideInMenu
        order
      }
      nextToken
    }
  }
`
export const listPagesByStatusMenuOrderCustom2 = /* GraphQL */ `
  query ListPagesByStatusMenuOrderCustom2(
    $status: PageStatus!
    $menuOrder: ModelPagePagesByStatusMenuOrderCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPagesByStatusMenuOrder(
      status: $status
      menuOrder: $menuOrder
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        blocks {
          items {
            component
            config
            content
            order
          }
        }
      }
      nextToken
    }
  }
`
export const getProductCustom = /* GraphQL */ `
  query GetProductCustom($id: ID!) {
    getProduct(id: $id) {
      id
      alias
      status
      category
      code
      name
      description
      content
      tags
      changeFreq
      priority
      price_of
      price
      qty
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
      createdAt
      updatedAt
      options {
        items {
          id
          name
          price
        }
      }
    }
  }
`
export const listProductsByAliasCreatedAtCustom = /* GraphQL */ `
  query ListProductsByAliasCreatedAtCustom(
    $alias: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProductsByAliasCreatedAt(
      alias: $alias
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        alias
        status
        category
        type
        relationID
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
        photo1
        photo2
        photo3
        photo4
        photo5
        thumbnail
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
        createdAt
        updatedAt
        options {
          items {
            id
            name
            price
          }
        }
      }
      nextToken
    }
  }
`
export const listProductsByStatusCategoryNameCustom = /* GraphQL */ `
  query ListProductsByStatusCategoryNameCustom(
    $status: PageStatus!
    $categoryName: ModelProductProductsByStatusCategoryNameCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProductsByStatusCategoryName(
      status: $status
      categoryName: $categoryName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        alias
        name
        description
        hideInMenu
        price_of
        price
        qty
        stockControl
        photo1
        thumbnail
        subCategory
        subCategoryProps {
          id
          title
        }
      }
      nextToken
    }
  }
`
export const listCartsByUserCustom = /* GraphQL */ `
  query ListCartsByUserCustom(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCartFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCartsByUser(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        productID
        qty
        changeName
        changeDescription
        changeQtyBlend
        changePriceAdjustment
        blendID
        product {
          thumbnail
          photo1
          name
          description
          type
          code
          price
          qty
          stockControl
          categoryProps {
            title
          }
        }
        options {
          items {
            id
            optionID
            option {
              name
              price
            }
          }
        }
      }
      nextToken
    }
  }
`
export const listProductsByCategorySubCategoryNameCustom = /* GraphQL */ `
  query ListProductsByCategorySubCategoryNameCustom(
    $category: ID!
    $subCategoryName: ModelProductProductsByCategorySubCategoryNameCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProductsByCategorySubCategoryName(
      category: $category
      subCategoryName: $subCategoryName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        alias
        status
        category
        subCategory
        type
        relationID
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
        hideInSearch
        createdAt
        search
        updatedAt
        categoryProps {
          id
          title
          description
          thumbnail
        }
      }
      nextToken
    }
  }
`
export const listProductsByStatusCategoryNameCustom2 = /* GraphQL */ `
  query ListProductsByStatusCategoryNameCustom2(
    $status: PageStatus!
    $categoryName: ModelProductProductsByStatusCategoryNameCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProductsByStatusCategoryName(
      status: $status
      categoryName: $categoryName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        alias
        status
        category
        subCategory
        type
        relationID
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
        subCategoryProps {
          id
          title
          description
          thumbnail
        }
      }
      nextToken
    }
  }
`
export const listUsersCustom = /* GraphQL */ `
  query ListUsersCustom(
    $id: ID
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
        groups {
          items {
            group
          }
        }
        addresses {
          items {
            name
            street
            number
            complement
            zipcode
            neighborhood
            city
            state
            country
            reference
          }
        }
        carts {
          items {
            product {
              name
              categoryProps {
                title
              }
              code
              alias
              price
            }
            createdAt
            qty
          }
        }
        ordersByCreatedAt(sortDirection: DESC) {
          items {
            id
            status
            total
          }
        }
        profile {
          schedulesFriday
          schedulesMonday
          schedulesSaturday
          schedulesSunday
          schedulesThursday
          schedulesTuesday
          schedulesWednesday
          zipCodeCoverage
          subSpecialties
          specialties
          profession
          notes
          gender
          birth
          pix
          doc
        }
      }
      nextToken
    }
  }
`
export const listUsersByGroupCustom = /* GraphQL */ `
  query ListUsersByGroupCustom(
    $group: String!
    $userID: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelGroupUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsersByGroup(
      group: $group
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        userID
        user {
          id
          name
          phone
          email
          avatar
          active
          createdAt
        }
        profile {
          docProfession
          profession
          specialties
          subSpecialties
          bio
          gender
          birth
          notes
          urlUserName
          urlEnable
          zipCodeCoverage
          schedulesSunday
          schedulesMonday
          schedulesTuesday
          schedulesWednesday
          schedulesThursday
          schedulesFriday
          schedulesSaturday
        }
      }
      nextToken
    }
  }
`
export const listOrdersByUserCreatedAtCustom = /* GraphQL */ `
  query ListOrdersByUserCreatedAtCustom(
    $userID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrdersByUserCreatedAt(
      userID: $userID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        updatedAt
        notes
        qrCodePix
        qrCodePixUrl
        payMethod
        user {
          name
          email
          phone
          avatar
          createdAt
        }
        items {
          items {
            qty
            code
            name
            description
            price
            photo1
            changeName
            changeDescription
            changeNameAdmin
            product {
              categoryProps {
                title
              }
              name
            }
            optionsItem {
              items {
                option {
                  name
                  price
                }
              }
            }
          }
        }
      }
      nextToken
    }
  }
`
export const listOrdersByStatusCreatedAtCustom = /* GraphQL */ `
  query ListOrdersByStatusCreatedAtCustom(
    $status: OrderStatus!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrdersByStatusCreatedAt(
      status: $status
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        updatedAt
        notes
        qrCodePix
        qrCodePixUrl
        payMethod
        user {
          name
          email
          phone
          avatar
          createdAt
        }
        items {
          items {
            qty
            code
            name
            description
            price
            photo1
            changeName
            changeDescription
            changeNameAdmin
            product {
              categoryProps {
                title
              }
              name
            }
            optionsItem {
              items {
                option {
                  name
                  price
                }
              }
            }
          }
        }
      }
      nextToken
    }
  }
`
export const listItemsByDataBaseCreatedAtCustom = /* GraphQL */ `
  query ListItemsByDataBaseCreatedAtCustom(
    $dataBaseID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelDataBaseItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItemsByDataBaseCreatedAt(
      dataBaseID: $dataBaseID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        dataBaseID
        userID
        data
        status
        search
        notes
        createdAt
        updatedAt
        user {
          name
          email
          phone
          avatar
        }
      }
      nextToken
    }
  }
`
export const listDeliveryByOrderCustom = /* GraphQL */ `
  query ListDeliveryByOrderCustom(
    $orderID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelDeliveryOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDeliveryByOrder(
      orderID: $orderID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        orderID
        date
        deliveryUserID
        deliveryUser {
          name
          email
          phone
          avatar
        }
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const listDeliveryByDateUserCustom = /* GraphQL */ `
  query ListDeliveryByDateUserCustom(
    $date: AWSDateTime!
    $deliveryUserID: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelDeliveryOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDeliveryByDateUser(
      date: $date
      deliveryUserID: $deliveryUserID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        orderID
        date
        deliveryUserID
        status
        createdAt
        updatedAt
        deliveryUser {
          name
          email
          phone
          avatar
        }
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
          updatedAt
          notes
          user {
            name
            email
            phone
            avatar
            createdAt
          }
          items {
            items {
              qty
              code
              name
              description
              price
              photo1
              changeName
              changeDescription
              changeNameAdmin
              product {
                categoryProps {
                  title
                }
                name
              }
              optionsItem {
                items {
                  option {
                    name
                    price
                  }
                }
              }
            }
          }
        }
      }
      nextToken
    }
  }
`
export const listDeliveryByUserDateCustom = /* GraphQL */ `
  query ListDeliveryByUserDateCustom(
    $deliveryUserID: ID!
    $date: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelDeliveryOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDeliveryByUserDate(
      deliveryUserID: $deliveryUserID
      date: $date
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        orderID
        date
        deliveryUserID
        status
        createdAt
        updatedAt
        deliveryUser {
          name
          email
          phone
          avatar
        }
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
          updatedAt
          notes
          user {
            name
            email
            phone
            avatar
            createdAt
          }
          items {
            items {
              qty
              code
              name
              description
              price
              photo1
              changeName
              changeDescription
              changeNameAdmin
              product {
                categoryProps {
                  title
                }
                name
              }
              optionsItem {
                items {
                  option {
                    name
                    price
                  }
                }
              }
            }
          }
        }
      }
      nextToken
    }
  }
`
export const listDeliveryOrdersCustom = /* GraphQL */ `
  query ListDeliveryOrdersCustom(
    $id: ID
    $filter: ModelDeliveryOrderFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listDeliveryOrders(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        orderID
        date
        deliveryUserID
        status
        createdAt
        updatedAt
        deliveryUser {
          name
          email
          phone
          avatar
        }
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
          updatedAt
          notes
          user {
            name
            email
            phone
            avatar
            createdAt
          }
          items {
            items {
              qty
              code
              name
              description
              price
              photo1
              changeName
              changeDescription
              changeNameAdmin
              product {
                categoryProps {
                  title
                }
                name
              }
              optionsItem {
                items {
                  option {
                    name
                    price
                  }
                }
              }
            }
          }
        }
      }
      nextToken
    }
  }
`;
export const listDeliveryByStatusDateCustom = /* GraphQL */ `
  query ListDeliveryByStatusDateCustom(
    $status: DeliveryStatus!
    $date: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelDeliveryOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDeliveryByStatusDate(
      status: $status
      date: $date
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        orderID
        date
        deliveryUserID
        status
        createdAt
        updatedAt
        deliveryUser {
          name
          email
          phone
          avatar
        }
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
          updatedAt
          notes
          user {
            name
            email
            phone
            avatar
            createdAt
          }
          items {
            items {
              qty
              code
              name
              description
              price
              photo1
              changeName
              changeDescription
              changeNameAdmin
              product {
                categoryProps {
                  title
                }
                name
              }
              optionsItem {
                items {
                  option {
                    name
                    price
                  }
                }
              }
            }
          }
        }
      }
      nextToken
    }
  }
`;

export const listProductsCustom = /* GraphQL */ `
  query ListProductsCustom(
    $id: ID
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listProducts(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        alias
        status
        category
        subCategory
        type
        relationID
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
        subCategoryProps {
          id
          title
          description
          thumbnail
        }
      }
      nextToken
    }
  }
`;
export const listUsedByCouponCustom = /* GraphQL */ `
  query ListUsedByCouponCustom(
    $couponID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCouponUsedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsedByCoupon(
      couponID: $couponID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        couponID
        userID
        createdAt
        updatedAt
        user {
            name
            email
            phone
            avatar
          }
      }
      nextToken
    }
  }
`;
export const getOrderCustom = /* GraphQL */ `
  query GetOrderCustom($id: ID!) {
    getOrder(id: $id) {
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
        updatedAt
        notes
        user {
          name
          email
          phone
          avatar
          createdAt
        }
        items {
          items {
            qty
            code
            name
            description
            price
            photo1
            changeName
            changeDescription
            changeNameAdmin
            product {
              categoryProps {
                title
              }
              name
            }
            optionsItem {
              items {
                option {
                  name
                  price
                }
              }
            }
          }
        }
    }
  }
`;
export const listRelationsLinkByUserTypeNotifyUpdatedAtCustom = /* GraphQL */ `
  query ListRelationsLinkByUserTypeNotifyUpdatedAtCustom(
    $userID: ID!
    $typeNotifyUpdatedAt: ModelRelationLinkRelationsLinkByUserTypeNotifyUpdatedAtCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRelationLinkFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRelationsLinkByUserTypeNotifyUpdatedAt( 
      userID: $userID
      typeNotifyUpdatedAt: $typeNotifyUpdatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        relationID
        type
        notify
        updatedAt
        search
        percentage
        createdAt
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
          config
          createdAt
          restrictedContents {
            items {
              id
              group
              subGroup
              order
              title
              description
              notes
              type
              content
              thumbnail
              identityId
              lifetime
              start
              expiration
              percentage 
            }
            nextToken
          }
        }
      }
      nextToken
    }
  }
`;
export const listRelationsLinkByRelationUserCustom = /* GraphQL */ `
  query ListRelationsLinkByRelationUserCustom(
    $relationID: ID!
    $userID: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRelationLinkFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRelationsLinkByRelationUser(
      relationID: $relationID
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        relationID
        type
        notify
        updatedAt
        createdAt
        user {
          name
          email
          phone
          avatar
        }
      }
      nextToken
    }
  }
`;
export const getUserByEmailCustom = /* GraphQL */ `
  query GetUserByEmailCustom(
    $email: AWSEmail!
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getUserByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        groups {
          items {
            group
          }
        }
        addresses {
          items {
            name
            street
            number
            complement
            zipcode
            neighborhood
            city
            state
            country
            reference
          }
        }
        carts {
          items {
            product {
              name
              categoryProps {
                title
              }
              code
              alias
              price
            }
            createdAt
            qty
          }
        }
        ordersByCreatedAt(sortDirection: DESC) {
          items {
            id
            status
            total
          }
        }
        profile {
          schedulesFriday
          schedulesMonday
          schedulesSaturday
          schedulesSunday
          schedulesThursday
          schedulesTuesday
          schedulesWednesday
          zipCodeCoverage
          subSpecialties
          specialties
          profession
          notes
          gender
          birth
          pix
          doc
        }
      }
      nextToken
    }
  }
`
export const getUserByPhoneCustom = /* GraphQL */ `
  query GetUserByPhoneCustom(
    $phone: AWSPhone!
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getUserByPhone(
      phone: $phone
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        groups {
          items {
            group
          }
        }
        addresses {
          items {
            name
            street
            number
            complement
            zipcode
            neighborhood
            city
            state
            country
            reference
          }
        }
        carts {
          items {
            product {
              name
              categoryProps {
                title
              }
              code
              alias
              price
            }
            createdAt
            qty
          }
        }
        ordersByCreatedAt(sortDirection: DESC) {
          items {
            id
            status
            total
          }
        }
        profile {
          schedulesFriday
          schedulesMonday
          schedulesSaturday
          schedulesSunday
          schedulesThursday
          schedulesTuesday
          schedulesWednesday
          zipCodeCoverage
          subSpecialties
          specialties
          profession
          notes
          gender
          birth
          pix
          doc
        }
      }
      nextToken
    }
  }
`
export const listCouponsByCodeCustom = /* GraphQL */ `
  query ListCouponsByCodeCustom(
    $code: String!
    $sortDirection: ModelSortDirection
    $filter: ModelCouponFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCouponsByCode(
      code: $code
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        products {
          items {
            price
            limit
            product {
              id
              name
            }
          }
        }
      }
      nextToken
    }
  }
`
export const listMessagesByRelationCreatedAtCustom = /* GraphQL */ `
  query ListMessagesByRelationCreatedAtCustom(
    $relationID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessagesByRelationCreatedAt(
      relationID: $relationID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        type
        content
        search
        identityId
        createdAt
        status
        user {
          name
          avatar
        }
      }
      nextToken
    }
  }
`
export const listMessagesByRestrictedContentCreatedAtCustom = /* GraphQL */ `
  query ListMessagesByRestrictedContentCreatedAtCustom(
    $restrictedContentID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessagesByRestrictedContentCreatedAt(
      restrictedContentID: $restrictedContentID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        type
        content
        search
        identityId
        createdAt
        user {
          name
          avatar
        }
      }
      nextToken
    }
  }
`
export const listMessagesByStatusRelationCreatedAtCustom = /* GraphQL */ `
  query ListMessagesByStatusRelationCreatedAtCustom(
    $status: String!
    $relationIDCreatedAt: ModelMessageMessagesByStatusRelationCreatedAtCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessagesByStatusRelationCreatedAt(
      status: $status
      relationIDCreatedAt: $relationIDCreatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        relationID
        restrictedContentID
        userID
        type
        content
        search
        identityId
        createdAt
        status
        updatedAt
        user {
          name
          avatar
        }
      }
      nextToken
    }
  }
`;