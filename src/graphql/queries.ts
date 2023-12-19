/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const signedUrl = /* GraphQL */ `
  query SignedUrl(
    $id: String
    $key: String
    $bucket: String
    $region: String
    $action: String
    $contentType: String
  ) {
    SignedUrl(
      id: $id
      key: $key
      bucket: $bucket
      region: $region
      action: $action
      contentType: $contentType
    )
  }
`;
export const listFolders = /* GraphQL */ `
  query ListFolders(
    $id: ID
    $filter: ModelFolderFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listFolders(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getVideoObject = /* GraphQL */ `
  query GetVideoObject($id: ID!) {
    getVideoObject(id: $id) {
      id
      token
      createdAt
      updatedAt
    }
  }
`;
export const listVideoObjects = /* GraphQL */ `
  query ListVideoObjects(
    $filter: ModelVideoObjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVideoObjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        token
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listFoldersByName = /* GraphQL */ `
  query ListFoldersByName(
    $name: String!
    $sortDirection: ModelSortDirection
    $filter: ModelFolderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFoldersByName(
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
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
      }
      nextToken
    }
  }
`;
export const getUserByEmail = /* GraphQL */ `
  query GetUserByEmail(
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
      }
      nextToken
    }
  }
`;
export const getUserByPhone = /* GraphQL */ `
  query GetUserByPhone(
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
      }
      nextToken
    }
  }
`;
export const listUsersByStatusCreatedAt = /* GraphQL */ `
  query ListUsersByStatusCreatedAt(
    $status: UserStatus!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsersByStatusCreatedAt(
      status: $status
      createdAt: $createdAt
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
      }
      nextToken
    }
  }
`;
export const getProfile = /* GraphQL */ `
  query GetProfile($userID: ID!) {
    getProfile(userID: $userID) {
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
export const listUsersByBirthDay = /* GraphQL */ `
  query ListUsersByBirthDay(
    $birthDay: String!
    $sortDirection: ModelSortDirection
    $filter: ModelProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsersByBirthDay(
      birthDay: $birthDay
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const listGroupUsers = /* GraphQL */ `
  query ListGroupUsers(
    $id: ID
    $filter: ModelGroupUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listGroupUsers(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        group
        userID
        profileID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listUsersByGroup = /* GraphQL */ `
  query ListUsersByGroup(
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
        id
        group
        userID
        profileID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listGroupsByUser = /* GraphQL */ `
  query ListGroupsByUser(
    $userID: ID!
    $group: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelGroupUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGroupsByUser(
      userID: $userID
      group: $group
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        group
        userID
        profileID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAddress = /* GraphQL */ `
  query GetAddress($id: ID!) {
    getAddress(id: $id) {
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
export const listAddresses = /* GraphQL */ `
  query ListAddresses(
    $id: ID
    $filter: ModelAddressFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listAddresses(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
    }
  }
`;
export const listAddressesByUser = /* GraphQL */ `
  query ListAddressesByUser(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelAddressFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAddressesByUser(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getPayMethod = /* GraphQL */ `
  query GetPayMethod($id: ID!) {
    getPayMethod(id: $id) {
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
export const listPayMethods = /* GraphQL */ `
  query ListPayMethods(
    $id: ID
    $filter: ModelPayMethodFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listPayMethods(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
    }
  }
`;
export const listPayMethodsByUser = /* GraphQL */ `
  query ListPayMethodsByUser(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPayMethodFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPayMethodsByUser(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const listLogs = /* GraphQL */ `
  query ListLogs(
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
      }
      nextToken
    }
  }
`;
export const listLogsByUserCreatedAt = /* GraphQL */ `
  query ListLogsByUserCreatedAt(
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
      }
      nextToken
    }
  }
`;
export const listLogsByUserTagCreatedAt = /* GraphQL */ `
  query ListLogsByUserTagCreatedAt(
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
      }
      nextToken
    }
  }
`;
export const listLogsByTagCreatedAt = /* GraphQL */ `
  query ListLogsByTagCreatedAt(
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
      }
      nextToken
    }
  }
`;
export const listLogsBySourceCreatedAt = /* GraphQL */ `
  query ListLogsBySourceCreatedAt(
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
      }
      nextToken
    }
  }
`;
export const getConfig = /* GraphQL */ `
  query GetConfig($id: ID!) {
    getConfig(id: $id) {
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
export const getInvite = /* GraphQL */ `
  query GetInvite($id: ID!) {
    getInvite(id: $id) {
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
export const listInvites = /* GraphQL */ `
  query ListInvites(
    $id: ID
    $filter: ModelInviteFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listInvites(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
    }
  }
`;
export const listInvitesByEmail = /* GraphQL */ `
  query ListInvitesByEmail(
    $email: String!
    $sortDirection: ModelSortDirection
    $filter: ModelInviteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInvitesByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const listInvitesByPhone = /* GraphQL */ `
  query ListInvitesByPhone(
    $phone: String!
    $sortDirection: ModelSortDirection
    $filter: ModelInviteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInvitesByPhone(
      phone: $phone
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const listInvitesByStatusCreatedAt = /* GraphQL */ `
  query ListInvitesByStatusCreatedAt(
    $status: InviteStatus!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelInviteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInvitesByStatusCreatedAt(
      status: $status
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const listDataBases = /* GraphQL */ `
  query ListDataBases(
    $id: ID
    $filter: ModelDataBaseFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listDataBases(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listDataBasesByName = /* GraphQL */ `
  query ListDataBasesByName(
    $name: String!
    $sortDirection: ModelSortDirection
    $filter: ModelDataBaseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDataBasesByName(
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listItemsByDataBaseCreatedAt = /* GraphQL */ `
  query ListItemsByDataBaseCreatedAt(
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
      }
      nextToken
    }
  }
`;
export const listItemsByUserCreatedAt = /* GraphQL */ `
  query ListItemsByUserCreatedAt(
    $userID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelDataBaseItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItemsByUserCreatedAt(
      userID: $userID
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
      }
      nextToken
    }
  }
`;
export const listMidias = /* GraphQL */ `
  query ListMidias(
    $id: ID
    $filter: ModelMidiaFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listMidias(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
    }
  }
`;
export const listMidiaByKey = /* GraphQL */ `
  query ListMidiaByKey(
    $key: String!
    $sortDirection: ModelSortDirection
    $filter: ModelMidiaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMidiaByKey(
      key: $key
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const listFavorites = /* GraphQL */ `
  query ListFavorites(
    $id: ID
    $filter: ModelFavoriteFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listFavorites(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        userID
        type
        favoriteID
        link
        content
        productID
        relationID
        pageID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listFavoritesByUserType = /* GraphQL */ `
  query ListFavoritesByUserType(
    $userID: ID!
    $type: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFavoriteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFavoritesByUserType(
      userID: $userID
      type: $type
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        type
        favoriteID
        link
        content
        productID
        relationID
        pageID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listFavoritesByFavoriteIDUser = /* GraphQL */ `
  query ListFavoritesByFavoriteIDUser(
    $favoriteID: String!
    $userID: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFavoriteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFavoritesByFavoriteIDUser(
      favoriteID: $favoriteID
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        type
        favoriteID
        link
        content
        productID
        relationID
        pageID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getRelation = /* GraphQL */ `
  query GetRelation($id: ID!) {
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
export const listRelations = /* GraphQL */ `
  query ListRelations(
    $id: ID
    $filter: ModelRelationFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listRelations(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
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
        config
        createdAt
      }
      nextToken
    }
  }
`;
export const listRelationsByTypeUpdatedAt = /* GraphQL */ `
  query ListRelationsByTypeUpdatedAt(
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
        search
        config
        createdAt
      }
      nextToken
    }
  }
`;
export const listRelationsByTypeModeUpdatedAt = /* GraphQL */ `
  query ListRelationsByTypeModeUpdatedAt(
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
        config
        createdAt
      }
      nextToken
    }
  }
`;
export const listRelationsByTypeStatusUpdatedAt = /* GraphQL */ `
  query ListRelationsByTypeStatusUpdatedAt(
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
        search
        config
        createdAt
      }
      nextToken
    }
  }
`;
export const listRelationsByStatusUpdatedAt = /* GraphQL */ `
  query ListRelationsByStatusUpdatedAt(
    $status: String!
    $updatedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRelationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRelationsByStatusUpdatedAt(
      status: $status
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
        search
        config
        createdAt
      }
      nextToken
    }
  }
`;
export const listRelationsByStatusTypeName = /* GraphQL */ `
  query ListRelationsByStatusTypeName(
    $status: String!
    $typeName: ModelRelationRelationsByStatusTypeNameCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRelationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRelationsByStatusTypeName(
      status: $status
      typeName: $typeName
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
        config
        createdAt
      }
      nextToken
    }
  }
`;
export const listRelationsLink = /* GraphQL */ `
  query ListRelationsLink(
    $id: ID
    $filter: ModelRelationLinkFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listRelationsLink(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
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
      }
      nextToken
    }
  }
`;
export const listRelationsLinkByUserTypeNotifyUpdatedAt = /* GraphQL */ `
  query ListRelationsLinkByUserTypeNotifyUpdatedAt(
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
      }
      nextToken
    }
  }
`;
export const listRelationsLinkByRelationUser = /* GraphQL */ `
  query ListRelationsLinkByRelationUser(
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
        search
        percentage
        createdAt
      }
      nextToken
    }
  }
`;
export const notifyByUserDate = /* GraphQL */ `
  query NotifyByUserDate(
    $userID: ID!
    $date: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNotifyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    notifyByUserDate(
      userID: $userID
      date: $date
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        date
        content
        link
        viewed
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listMessagesByRelationCreatedAt = /* GraphQL */ `
  query ListMessagesByRelationCreatedAt(
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
      }
      nextToken
    }
  }
`;
export const listMessagesByRestrictedContentCreatedAt = /* GraphQL */ `
  query ListMessagesByRestrictedContentCreatedAt(
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
      }
      nextToken
    }
  }
`;
export const listMessagesByUserCreatedAt = /* GraphQL */ `
  query ListMessagesByUserCreatedAt(
    $userID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessagesByUserCreatedAt(
      userID: $userID
      createdAt: $createdAt
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
      }
      nextToken
    }
  }
`;
export const listMessagesByStatusRelationCreatedAt = /* GraphQL */ `
  query ListMessagesByStatusRelationCreatedAt(
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
      }
      nextToken
    }
  }
`;
export const listSchedulesByRelationDateTime = /* GraphQL */ `
  query ListSchedulesByRelationDateTime(
    $relationID: ID!
    $dateTime: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelScheduleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSchedulesByRelationDateTime(
      relationID: $relationID
      dateTime: $dateTime
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        updatedAt
      }
      nextToken
    }
  }
`;
export const listSchedulesByUserCreatedAt = /* GraphQL */ `
  query ListSchedulesByUserCreatedAt(
    $userID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelScheduleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSchedulesByUserCreatedAt(
      userID: $userID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        updatedAt
      }
      nextToken
    }
  }
`;
export const getDocument = /* GraphQL */ `
  query GetDocument($id: ID!) {
    getDocument(id: $id) {
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
export const listDocumentsByRelationUpdatedAt = /* GraphQL */ `
  query ListDocumentsByRelationUpdatedAt(
    $relationID: ID!
    $updatedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelDocumentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDocumentsByRelationUpdatedAt(
      relationID: $relationID
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      }
      nextToken
    }
  }
`;
export const listDocumentsByOwnerUpdatedAt = /* GraphQL */ `
  query ListDocumentsByOwnerUpdatedAt(
    $ownerID: ID!
    $updatedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelDocumentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDocumentsByOwnerUpdatedAt(
      ownerID: $ownerID
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      }
      nextToken
    }
  }
`;
export const getRestrictedContent = /* GraphQL */ `
  query GetRestrictedContent($id: ID!) {
    getRestrictedContent(id: $id) {
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
export const listRestrictedContentsByRelationOrder = /* GraphQL */ `
  query ListRestrictedContentsByRelationOrder(
    $relationID: ID!
    $order: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRestrictedContentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRestrictedContentsByRelationOrder(
      relationID: $relationID
      order: $order
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const listRestrictedContentViewByRestrictedContent = /* GraphQL */ `
  query ListRestrictedContentViewByRestrictedContent(
    $restrictedContentID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRestrictedContentViewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRestrictedContentViewByRestrictedContent(
      restrictedContentID: $restrictedContentID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        restrictedContentID
        userID
        percentage
        rating
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listRestrictedContentViewByRestrictedContentUser = /* GraphQL */ `
  query ListRestrictedContentViewByRestrictedContentUser(
    $restrictedContentID: ID!
    $userID: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRestrictedContentViewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRestrictedContentViewByRestrictedContentUser(
      restrictedContentID: $restrictedContentID
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        restrictedContentID
        userID
        percentage
        rating
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listRestrictedContentViewByUser = /* GraphQL */ `
  query ListRestrictedContentViewByUser(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRestrictedContentViewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRestrictedContentViewByUser(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        restrictedContentID
        userID
        percentage
        rating
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMenu = /* GraphQL */ `
  query GetMenu($id: ID!) {
    getMenu(id: $id) {
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
export const listMenus = /* GraphQL */ `
  query ListMenus(
    $id: ID
    $filter: ModelMenuFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listMenus(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
    }
  }
`;
export const listMenusByAliasOrder = /* GraphQL */ `
  query ListMenusByAliasOrder(
    $alias: String!
    $order: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMenuFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMenusByAliasOrder(
      alias: $alias
      order: $order
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getPage = /* GraphQL */ `
  query GetPage($id: ID!) {
    getPage(id: $id) {
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
export const listPages = /* GraphQL */ `
  query ListPages(
    $id: ID
    $filter: ModelPageFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listPages(
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
      nextToken
    }
  }
`;
export const listPagesByAliasCreatedAt = /* GraphQL */ `
  query ListPagesByAliasCreatedAt(
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
      nextToken
    }
  }
`;
export const listPagesByStatusMenuOrder = /* GraphQL */ `
  query ListPagesByStatusMenuOrder(
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
      }
      nextToken
    }
  }
`;
export const listPagesByMenuOrder = /* GraphQL */ `
  query ListPagesByMenuOrder(
    $menu: ID!
    $order: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPagesByMenuOrder(
      menu: $menu
      order: $order
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
      }
      nextToken
    }
  }
`;
export const getBlock = /* GraphQL */ `
  query GetBlock($id: ID!) {
    getBlock(id: $id) {
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
export const listBlocks = /* GraphQL */ `
  query ListBlocks(
    $id: ID
    $filter: ModelBlockFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listBlocks(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        pageID
        order
        component
        content
        config
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listBlocksByPage = /* GraphQL */ `
  query ListBlocksByPage(
    $pageID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelBlockFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBlocksByPage(
      pageID: $pageID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        pageID
        order
        component
        content
        config
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listBlocksByPageOrder = /* GraphQL */ `
  query ListBlocksByPageOrder(
    $pageID: ID!
    $order: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelBlockFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBlocksByPageOrder(
      pageID: $pageID
      order: $order
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        pageID
        order
        component
        content
        config
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCategory = /* GraphQL */ `
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
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
export const listCategories = /* GraphQL */ `
  query ListCategories(
    $id: ID
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCategories(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
    }
  }
`;
export const listCategoryByAliasOrder = /* GraphQL */ `
  query ListCategoryByAliasOrder(
    $alias: String!
    $order: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategoryByAliasOrder(
      alias: $alias
      order: $order
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
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
export const listProducts = /* GraphQL */ `
  query ListProducts(
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
      nextToken
    }
  }
`;
export const listProductsByAliasCreatedAt = /* GraphQL */ `
  query ListProductsByAliasCreatedAt(
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
      nextToken
    }
  }
`;
export const listProductsByStatusCategoryName = /* GraphQL */ `
  query ListProductsByStatusCategoryName(
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
      nextToken
    }
  }
`;
export const listProductsByCategorySubCategoryName = /* GraphQL */ `
  query ListProductsByCategorySubCategoryName(
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
      nextToken
    }
  }
`;
export const getOption = /* GraphQL */ `
  query GetOption($id: ID!) {
    getOption(id: $id) {
      id
      productID
      name
      price
      createdAt
      updatedAt
    }
  }
`;
export const listOptions = /* GraphQL */ `
  query ListOptions(
    $id: ID
    $filter: ModelOptionFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listOptions(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        productID
        name
        price
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listOptionsByProduct = /* GraphQL */ `
  query ListOptionsByProduct(
    $productID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelOptionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOptionsByProduct(
      productID: $productID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        productID
        name
        price
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listCarts = /* GraphQL */ `
  query ListCarts(
    $id: ID
    $filter: ModelCartFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCarts(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listCartsByUser = /* GraphQL */ `
  query ListCartsByUser(
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listOptionsByCart = /* GraphQL */ `
  query ListOptionsByCart(
    $cartID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCartOptionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOptionsByCart(
      cartID: $cartID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        cartID
        optionID
        createdAt
        updatedAt
        userID
      }
      nextToken
    }
  }
`;
export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
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
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $id: ID
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listOrders(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
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
        notes
        qrCodePix
        qrCodePixUrl
        payMethod
        updatedAt
      }
      nextToken
    }
  }
`;
export const listOrdersByUserStatusCreatedAt = /* GraphQL */ `
  query ListOrdersByUserStatusCreatedAt(
    $userID: ID!
    $statusCreatedAt: ModelOrderOrdersByUserStatusCreatedAtCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrdersByUserStatusCreatedAt(
      userID: $userID
      statusCreatedAt: $statusCreatedAt
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
        notes
        qrCodePix
        qrCodePixUrl
        payMethod
        updatedAt
      }
      nextToken
    }
  }
`;
export const listOrdersByUserCreatedAt = /* GraphQL */ `
  query ListOrdersByUserCreatedAt(
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
        notes
        qrCodePix
        qrCodePixUrl
        payMethod
        updatedAt
      }
      nextToken
    }
  }
`;
export const listOrdersByStatusCreatedAt = /* GraphQL */ `
  query ListOrdersByStatusCreatedAt(
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
        notes
        qrCodePix
        qrCodePixUrl
        payMethod
        updatedAt
      }
      nextToken
    }
  }
`;
export const listItemsByOrder = /* GraphQL */ `
  query ListItemsByOrder(
    $orderID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelOrderItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItemsByOrder(
      orderID: $orderID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        orderID
        productID
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
      nextToken
    }
  }
`;
export const listOptionsByOrderItem = /* GraphQL */ `
  query ListOptionsByOrderItem(
    $orderItemID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelOrderItemOptionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOptionsByOrderItem(
      orderItemID: $orderItemID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        orderItemID
        optionID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCoupon = /* GraphQL */ `
  query GetCoupon($id: ID!) {
    getCoupon(id: $id) {
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
export const listCoupons = /* GraphQL */ `
  query ListCoupons(
    $id: ID
    $filter: ModelCouponFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCoupons(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
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
      }
      nextToken
    }
  }
`;
export const listCouponsByCode = /* GraphQL */ `
  query ListCouponsByCode(
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
      }
      nextToken
    }
  }
`;
export const listProductsByCoupon = /* GraphQL */ `
  query ListProductsByCoupon(
    $couponID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCouponProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProductsByCoupon(
      couponID: $couponID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        couponID
        productID
        price
        limit
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listUsedByCoupon = /* GraphQL */ `
  query ListUsedByCoupon(
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
        qty
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listUsedByCouponUser = /* GraphQL */ `
  query ListUsedByCouponUser(
    $couponID: ID!
    $userID: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCouponUsedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsedByCouponUser(
      couponID: $couponID
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        couponID
        userID
        qty
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listDeliveryOrders = /* GraphQL */ `
  query ListDeliveryOrders(
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
      }
      nextToken
    }
  }
`;
export const listDeliveryByOrder = /* GraphQL */ `
  query ListDeliveryByOrder(
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
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listDeliveryByDateUser = /* GraphQL */ `
  query ListDeliveryByDateUser(
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
      }
      nextToken
    }
  }
`;
export const listDeliveryByUserDate = /* GraphQL */ `
  query ListDeliveryByUserDate(
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
      }
      nextToken
    }
  }
`;
export const listDeliveryByStatusDate = /* GraphQL */ `
  query ListDeliveryByStatusDate(
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
      }
      nextToken
    }
  }
`;
export const listDeliveryMethodOrders = /* GraphQL */ `
  query ListDeliveryMethodOrders(
    $id: ID
    $filter: ModelDeliveryMethodOrderFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listDeliveryMethodOrders(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        zipCode
        price
        time
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listQrCodeScansByUser = /* GraphQL */ `
  query ListQrCodeScansByUser(
    $userID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelQrCodeScanFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQrCodeScansByUser(
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
        relationID
        uuid
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listQuiz = /* GraphQL */ `
  query ListQuiz(
    $id: ID
    $filter: ModelQuizFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listQuiz(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        description
        search
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listQuizByStatus = /* GraphQL */ `
  query ListQuizByStatus(
    $status: QuizStatus!
    $sortDirection: ModelSortDirection
    $filter: ModelQuizFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuizByStatus(
      status: $status
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        description
        search
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listQuestionsByQuiz = /* GraphQL */ `
  query ListQuestionsByQuiz(
    $quizID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelQuizQuestionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuestionsByQuiz(
      quizID: $quizID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
